import { Component, OnInit } from '@angular/core';
import { Order } from '../entities';
import { CommsService } from '../comms.service';
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

  constructor(public commsService: CommsService, private logonService: LogonService) { }

  ngOnInit() {
  }

  refreshOrders(): void {
    this.commsService.downloadOrders();
  }
}
