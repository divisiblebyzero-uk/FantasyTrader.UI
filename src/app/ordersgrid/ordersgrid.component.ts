import { Component, OnInit } from '@angular/core';
import { CommsService } from '../comms.service';
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
  showTodayOrders = true;
  showYesterdayOrders = false;
  showOlderOrders = false;

  constructor(public commsService: CommsService) { }

  ngOnInit() {
  }

  refreshOrders(): void {
    this.commsService.downloadOrders();
  }
}
