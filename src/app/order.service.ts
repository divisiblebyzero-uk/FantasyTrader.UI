import { Injectable } from '@angular/core';
import { Order } from './entities';
import { ORDERS } from './mock-orders';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Log } from './log';
import { OktaAuthService } from '@okta/okta-angular';
import * as signalR from "@microsoft/signalr";
import { LogonService } from './logon.service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private logonService: LogonService) { }

  private log: Log = new Log('Order Service');
  private orderHubUrl = environment.urlBase + 'order';

  private hubConnection: signalR.HubConnection;
  public hubConnected = false;

  public orders: Order[];

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.orderHubUrl)
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.hubConnection.onclose(err => {this.log.debug("OnClose: " + err); this.hubConnected = false;});
    this.hubConnection.onreconnected(() => {this.log.debug("OnReconnected"); this.hubConnected = true;});
    this.hubConnection.onreconnecting((err) => {this.log.debug("OnReconnecting: " + err); this.hubConnected = false;});
    this.hubConnection.start()
      .then(() => {
        this.log.debug('Connection started');
        this.hubConnected = true;
        this.addNewOrderListener();
        this.downloadOrders();
      })
      .catch(err => this.log.error('Error while starting connection: ' + err));
  }

  public addNewOrderListener = () => {
    this.hubConnection.on('New Order', (data) => {
      this.log.debug('New order: ' + data.clientOrderId);
      this.orders.push(data);
    });
  }

  public placeOrder(order: Order) {
    this.log.debug("Order Service: Creating order: " + JSON.stringify(order));
    this.hubConnection.invoke("CreateOrder", JSON.stringify(order))
    .then(response => this.log.debug('Create order response: ' + JSON.stringify(response)))
    .catch(err => this.log.error(err));
  }

  public downloadOrders(): void {
    this.log.debug('Downloading orders');
    
    this.hubConnection.invoke<Order[]>('GetOrders')
      .then(orders => this.orders = orders)
      .catch(err => this.log.error(err));
  }
}
