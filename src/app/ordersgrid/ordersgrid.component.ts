import { Component, OnInit } from '@angular/core';
import { CommsService } from '../comms.service';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { LogLevel, Log } from '../log';
import { Order } from '../entities';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderHistoryComponent } from '../order-history/order-history.component';

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

  constructor(public commsService: CommsService, private modalService: NgbModal) { }

  ngOnInit() {
  }

  refreshOrders(): void {
    this.commsService.downloadOrders();
  }

  public showOrderHistory(order: Order): void {
    console.log("Clicked on: " + order.id);
    const modalRef = this.modalService.open(OrderHistoryComponent, { size: 'lg' });
    modalRef.componentInstance.orderId = order.id;
  }
}
