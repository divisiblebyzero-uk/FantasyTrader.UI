import { Component, OnInit } from '@angular/core';
import { Order } from '../order';
import { OrderService } from '../order.service';
import { ORDERS } from '../mock-orders';

@Component({
  selector: 'app-ordersgrid',
  templateUrl: './ordersgrid.component.html',
  styleUrls: ['./ordersgrid.component.css']
})
export class OrdersgridComponent implements OnInit {

  constructor(private orderService: OrderService) { }

  getOrders(): void {
    this.orderService.getOrders().subscribe(orders => this.orders = orders);
  }
  
  ngOnInit() {
    this.getOrders();
  }

  orders: Order[];

}
