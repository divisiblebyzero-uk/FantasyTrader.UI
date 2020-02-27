import { Component, OnInit } from '@angular/core';
import { Order } from '../entities';
import { OrderService } from '../order.service';
import { ORDERS } from '../mock-orders';
import { LogonService } from '../logon.service';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { LogLevel, Log } from '../log';

@Component({
  selector: 'app-ordersgrid',
  templateUrl: './ordersgrid.component.html',
  styleUrls: ['./ordersgrid.component.css']
})
export class OrdersgridComponent implements OnInit {

  spinning = false;
  faSync = faSync;
  log = new Log('Ordersgrid');

  constructor(public orderService: OrderService, private logonService: LogonService) { }

  getOrders(): void {
    this.orderService.startConnection();
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

  refreshOrders(): void {
    this.orderService.downloadOrders();
  }
}
