import { Injectable } from '@angular/core';
import { Order, Price } from './entities';
import { ORDERS } from './mock-orders';
import { Observable, of, Subject } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { Log } from './log';
import * as signalR from "@microsoft/signalr";
import { LogonService } from './logon.service';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CommsService {

  constructor(private logonService: LogonService, private auth: AuthService) {
    const todayDateTime = new Date();
    this.today = new Date(todayDateTime.getFullYear(), todayDateTime.getMonth(), todayDateTime.getDate());
  }

  private log: Log = new Log('Comms Service');
  private ordersHubUrl = environment.urlBase + 'order';
  private pricesHubUrl = environment.urlBase + 'price';

  public ordersHub: signalR.HubConnection;
  public pricesHub: signalR.HubConnection;

  public todayOrders: Order[];
  public yesterdayOrders: Order[];
  public olderOrders: Order[];
  public prices: Price[] = [];
  public marketStatus;

  private today: Date;
  private daysDifferenceFromToday(inputDate: Date): number {
    const theDate = new Date(inputDate);
    return Math.floor((this.today.getTime() - theDate.getTime()) / (1000*60*60*24));
  }

  private addOrUpdate(order: Order, orderArray: Order[]) {
    let index = orderArray.findIndex(o => o.id === order.id);
    //console.log("index is: " + orderInArray); 
    if (index == -1) {
      orderArray.push(order);
    } else {
      orderArray.splice(index, 1, order);
    }
  }

  private addOrder(order: Order) {
    if (order.created) {
      const days = this.daysDifferenceFromToday(order.created);
      if (days < 0) {
        this.addOrUpdate(order, this.todayOrders);
      } else if (days == 0) {
        this.addOrUpdate(order, this.yesterdayOrders);
      } else {
        this.addOrUpdate(order, this.olderOrders);
      }
    } else {
      this.todayOrders.push(order);
    }
    
  }
  
  private prepareConnection(name: string, url: string, token: string): signalR.HubConnection {
    let hub: signalR.HubConnection = new signalR.HubConnectionBuilder()
    .withUrl(url, {accessTokenFactory: () => token})
    .withAutomaticReconnect()
    .configureLogging(signalR.LogLevel.Information)
    .build();

    hub.onclose(err => { this.log.error(name + ': OnClose: ' + err); });
    hub.onreconnected(() => { this.log.debug(name + ': OnReconnected'); });
    hub.onreconnecting((err) => { this.log.error(name + ': OnReconnecting: ' + err); });

    return hub;
  }

  public startConnections = () => {

    this.auth.getTokenSilently$().subscribe(token => {
      this.ordersHub = this.prepareConnection('Orders', this.ordersHubUrl, token);
      this.ordersHub.start()
        .then(() => {
          this.log.debug('Orders: Connection started');
          this.addOrdersHubListeners();
          this.downloadOrders();
        })
        .catch(err => this.log.error('Error while starting connection: ' + err));
  
      this.pricesHub = this.prepareConnection('Prices', this.pricesHubUrl, token);
      this.pricesHub.start()
        .then(() => {
          this.log.debug('Prices: Connection started');
          this.addPricesHubListeners();
          this.getInitialPricesHubInformation();
        })
        .catch(err => this.log.error('Error while starting connection: ' + err));
      }
      );

  }



  // Order Hub Functions
  public addOrdersHubListeners = () => {
    this.ordersHub.on('New Order', (data) => {
      this.log.debug('New order: ' + data.clientOrderId);
      this.addOrder(data);
    });
    this.ordersHub.on('Order Update', (data) => {
      this.log.debug('Order update: ' + data.clientOrderId);
      this.addOrder(data);
    });
  }

  public placeOrder(order: Order) {
    this.log.debug("Order Service: Creating order: " + JSON.stringify(order));
    this.ordersHub.invoke("CreateOrder", JSON.stringify(order))
      .then(response => this.log.debug('Create order response: ' + JSON.stringify(response)))
      .catch(err => this.log.error(err));
  }

  public downloadOrders(): void {
    this.log.debug('Downloading orders');

    this.ordersHub.invoke<Order[]>('GetOrders')
      .then(orders => {
        this.todayOrders = [];
        this.yesterdayOrders = [];
        this.olderOrders = [];
        orders.forEach(order => this.addOrder(order));
      })
      .catch(err => this.log.error(err));
  }

  public getOrderHistories(orderId: number) {
    this.log.debug("Order Service: Getting Histories for " + orderId);
    return this.ordersHub.invoke("GetOrderHistories", orderId);
  }


  // Price Hub Functions
  private getInitialPricesHubInformation() {
    this.pricesHub.invoke("GetAllPrices").then(prices => {
      this.prices = prices;
    });
    this.pricesHub.invoke("GetMarketState").then(state => {
      this.setMarketStatus(state);
      this.log.debug("The market is: " + state);
      if (state === 'Open') {
        this.startStreaming();
      }
    });
  }

  private addPricesHubListeners() {
    this.pricesHub.on("marketOpened", () => {
      this.setMarketStatus("Opened");
      this.startStreaming();
    });

    this.pricesHub.on("marketClosed", () => {
      this.setMarketStatus("Closed");
      this.startStreaming();
    });
  }

  private startStreaming(): void {
    this.pricesHub.stream("StreamPrices").subscribe({
      next: price => this.consumePriceUpdate(price),
      error: (err) => this.log.error(err),
      complete: () => this.log.debug("Stream complete")
    });
  }
  private consumePriceUpdate(price: Price) {
    this.prices[price.symbol] = price;
  }

  public openMarket(): void {
    this.log.debug("Opening Market");
    this.pricesHub.invoke("OpenMarket");
  }

  public closeMarket(): void {
    this.log.debug("Closing Market");
    this.pricesHub.invoke("CloseMarket");
  }

  
  public setMarketStatus(newStatus: string): void {
    this.log.debug("Setting market to: " + newStatus);
    this.marketStatus = newStatus;
  }

}
