import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommsService } from '../comms.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  @Input() orderId;

  constructor(public activeModal: NgbActiveModal, private commsService: CommsService) { }

  orderHistories = [];

  ngOnInit(): void {
    this.commsService.getOrderHistories(this.orderId)
      .then(response => {console.log("Got histories: " + response);this.orderHistories = response;})
      .catch(err => console.error("Error: " + err));
  }

  

}
