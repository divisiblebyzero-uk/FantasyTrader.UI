import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  title = 'FrontEnd';
  public showPrices: boolean = false;
  public showOrders: boolean = true;
  public showPnL: boolean = false;
}
