import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ordersgrid',
  templateUrl: './ordersgrid.component.html',
  styleUrls: ['./ordersgrid.component.css']
})
export class OrdersgridComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public orders = [
    {
      id: 1,
      clientOrderId: "MY ORDER1",
      symbol: "ABC",
      account: {
        id: 1,
        name: "My Account"
      },
      quantity: 100,
      fillQuantity: 0,
      orderState: "New",
      orderType: "FillOrKill",
      side: "Buy",
      price: 100
    },
    {
      id: 2,
      clientOrderId: "MY ORDER2",
      symbol: "ABC",
      account: {
        id: 1,
        name: "My Account"
      },
      quantity: 100,
      fillQuantity: 0,
      orderState: "New",
      orderType: "FillOrKill",
      side: "Sell",
      price: 105
    }

  ];

}
