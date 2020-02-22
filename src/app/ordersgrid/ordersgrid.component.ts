import { Component, OnInit } from '@angular/core';
import { Order } from '../order';
import { OrderService } from '../order.service';
import { ORDERS } from '../mock-orders';
import { LogonService } from '../logon.service';
import { faSync } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-ordersgrid',
  templateUrl: './ordersgrid.component.html',
  styleUrls: ['./ordersgrid.component.css']
})
export class OrdersgridComponent implements OnInit {

  spinning = false;
  faSync = faSync;

  constructor(private orderService: OrderService, private logonService: LogonService) { }

  getOrders(): void {
    this.orderService.getOrders().subscribe(orders => this.orders = orders);
    this.orderService.startConnection();
    this.orderService.addNewOrderListener();

    this.orderService.getOrder().subscribe(order => this.orders.push(order));
  }
  
  ngOnInit() {
    if (this.logonService.isAuthenticated) {
      this.getOrders();
    } else {
      this.logonService.getAuthStatusChanges().subscribe(isAuth => {
        if (isAuth) { this.getOrders() };
      });
    }
  }

  orders: Order[];

  refreshOrders(): void {
    this.orderService.getOrders().subscribe(orders => this.orders = orders);
  }
}
