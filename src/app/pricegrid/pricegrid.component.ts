import { Component, OnInit } from '@angular/core';
import { PricegridService } from '../pricegrid.service';
import { MessageService } from '../message.service';
import * as signalR from "@microsoft/signalr";
import { Account, Order, Price, PriceGrid, PriceGridEntry } from '../entities';
import { CommsService } from '../comms.service';
import { Log, LogLevel } from '../log';

@Component({
  selector: 'app-pricegrid',
  templateUrl: './pricegrid.component.html',
  styleUrls: ['./pricegrid.component.css']
})
export class PricegridComponent implements OnInit {

  private log: Log = new Log('PricegridComponent', LogLevel.Debug);

  activePriceGrid;
  constructor(
    public priceGridService: PricegridService,
    public commsService: CommsService
    ) { }

  ngOnInit() {
    this.priceGridService.getPriceGrids();
    this.getAccounts();
  }

  getAccounts(): void {
    this.priceGridService.getAccounts().subscribe(accounts => this.accounts = accounts);
  }

  tabChanged(newIndex) {
    this.priceGridService.getPriceGridEntries(this.activePriceGrid).subscribe(priceGridEntries => {this.log.debug("Received: " + JSON.stringify(priceGridEntries));this.priceGridEntries = priceGridEntries;});
  }

  selectedPriceGrid: number;
  accounts: Account[];
  priceGridEntries: PriceGridEntry[];

  public placeOrder(symbol: string) {
    this.log.info(symbol);
    let order:Order = {
      "clientOrderId": 'made up',
      "symbol": symbol,
      "account": this.accounts[0],
      "quantity": 1,
      "orderType": 'FillOrKill',
      "side": 'Buy',
      "price": this.commsService.prices[symbol].lastPrice
    }
    this.commsService.placeOrder(order);
  }

}
