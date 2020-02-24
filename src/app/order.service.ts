import { Injectable } from '@angular/core';
import { Order } from './order';
import { ORDERS } from './mock-orders';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OktaAuthService } from '@okta/okta-angular';
import * as signalR from "@aspnet/signalr";
import { LogonService } from './logon.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient, private messageService: MessageService, private logonService: LogonService) { }

  private ordersUrl = "https://localhost:5001/api/orders";

  private hubConnection: signalR.HubConnection;

  private startConnectionActual(): void {
    this.hubConnection.start()
      .then(() => this.messageService.add('Connection started'))
      .catch(err => this.messageService.add('Error while starting connection: ' + err));
  }

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:5001/order')
      .build();
    
    this.startConnectionActual();

    this.hubConnection.onclose(() => {
      this.messageService.add('Connection dropped ... waiting 3s to restart');
      setTimeout(function() {
        this.startConnectionActual();
      }, 3000);
    });
  }

  private orders: Subject<Order> = new Subject<Order>();

  public getOrder(): Observable<Order> {
    return this.orders.asObservable();
  }

  public addNewOrderListener = () => {
    this.hubConnection.on('New Order', (data) => {
      this.messageService.add('New order: ' + data.clientOrderId);
      this.orders.next(data);
    });
  }

  public placeOrder(order: Order) {
    this.messageService.add("Order Service: Creating order: " + JSON.stringify(order));
    //this.http.post<any>(this.ordersUrl, order).subscribe(result => console.log(JSON.stringify(result)));
    this.hubConnection.invoke("CreateOrder", JSON.stringify(order))
    //this.hubConnection.invoke("SayHello", JSON.stringify(order))
    .then(response => console.log(JSON.stringify(response)))
    .catch(err => console.error(err));
  }

  public getOrders(): Observable<Order[]> {
    this.messageService.add('OrderService: fetching orders');
    if (!this.logonService.isAuthenticated) {
      this.messageService.add('OrderService: not logged on');
      return null;
    }
    //let headers = new HttpHeaders();
    //headers.append('Content-Type', 'application/json');
    //let token = this.oktaAuth.getAccessToken();
    let token = this.logonService.authToken;
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
    headers.append('Authorization', 'Bearer ' + token);
    return this.http.get<Order[]>(this.ordersUrl, {headers})
        .pipe(
          tap(_ => this.log('fetched orders')),
      catchError(this.handleError<Order[]>('getOrders', []))
    );;
    //return of(ORDERS);
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

  private log(message: string) {
    this.messageService.add(`OrderService: ${message}`);
  }
}
