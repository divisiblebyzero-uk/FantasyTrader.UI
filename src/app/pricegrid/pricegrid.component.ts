import { Component, OnInit } from '@angular/core';
import { PriceGrid, PriceGridEntry } from '../pricegrid';
import { PricegridService } from '../pricegrid.service';
import { MessageService } from '../message.service';
import * as signalR from "@aspnet/signalr";
import { Price } from '../price';
import { Order } from '../order';
import { Account } from '../account';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-pricegrid',
  templateUrl: './pricegrid.component.html',
  styleUrls: ['./pricegrid.component.css']
})
export class PricegridComponent implements OnInit {

  activePriceGrid;
  constructor(
    private priceGridService: PricegridService,
    private messageService: MessageService,
    private orderService: OrderService
    ) { }

  ngOnInit() {
    this.messageService.add("PGC: Starting Connection");
    this.startConnection();
    this.messageService.add("PGC: Adding Listener");
    //this.priceGridService.addPriceUpdateListener();
    this.getPriceGrids();
    this.getAccounts();
  }

  getAccounts(): void {
    this.priceGridService.getAccounts().subscribe(accounts => this.accounts = accounts);
  }

  getPriceGrids(): void {
    this.priceGridService.getPriceGrids().subscribe(priceGrids => this.priceGrids = priceGrids);
  }

  tabChanged(newIndex) {
    this.priceGridService.getPriceGridEntries(this.activePriceGrid).subscribe(priceGridEntries => {this.messageService.add("Received: " + JSON.stringify(priceGridEntries));this.priceGridEntries = priceGridEntries;});

    this.messageService.add("PGC: Adding Subscription");
    //this.priceGridService.addPriceSubscription('FTSY');
    //this.priceGridService.getMarketState();
    //this.orderService.getOrder().subscribe(order => this.orders.push(order));

  }

  selectedPriceGrid: number;
  accounts: Account[];
  priceGrids: PriceGrid[];
  priceGridEntries: PriceGridEntry[];

  prices: Price[];
  private priceHubUrl = "https://localhost:5001/price";
  private hubConnection: signalR.HubConnection;
  marketStatus;

  public placeOrder(symbol: string) {
    console.log(symbol);
    let order:Order = {
      "clientOrderId": 'made up',
      "symbol": symbol,
      "account": this.accounts[0],
      "quantity": 1,
      "orderType": 'FillOrKill',
      "side": 'Buy',
      "price": this.prices[symbol].lastPrice
    }
    this.orderService.placeOrder(order);
  }

  public setMarketStatus(newStatus: string): void {
    this.log("Setting market to: " + newStatus);
    this.marketStatus = newStatus;
  }

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.priceHubUrl)
      .build();

    this.hubConnection.start().then(
      () => {
        this.log("Connected");
        this.hubConnection.invoke("GetAllPrices").then(prices => {
          this.log(JSON.stringify(prices));
          this.prices = prices;
        });
        this.hubConnection.invoke("GetMarketState").then(state => {
          this.setMarketStatus(state);
          this.log("The market is: " + state);
          if (state === 'Open') {
            this.startStreaming();
          }
        });
      }
    )

    this.hubConnection.on("marketOpened", () => {
      this.setMarketStatus("Opened");
      this.startStreaming();
    });

    this.hubConnection.on("marketClosed", () => {
      this.setMarketStatus("Closed");
      this.startStreaming();
    });

    this.hubConnection.onclose(() => {
      this.messageService.add('Price connection dropped ... ');
    });
  }
  private startStreaming(): void {
    this.hubConnection.stream("StreamPrices").subscribe({
      next: price => this.consumePriceUpdate(price),
      error: (err) => this.log(err),
      complete: () => this.log("Stream complete")
    });
  }
  private consumePriceUpdate(price: Price) {
    this.prices[price.symbol] = price;
  }

  public openMarket(): void {
    this.log("Opening Market");
    this.hubConnection.invoke("OpenMarket");
  }

  public closeMarket(): void {
    this.hubConnection.invoke("CloseMarket");
  }

  private log(message: string) {
    this.messageService.add(`PriceGridService: ${message}`);
  }

}
