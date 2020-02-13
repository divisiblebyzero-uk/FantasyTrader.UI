import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FrontEnd';
  public showPrices: boolean = true;
  public showOrders: boolean = false;
  public showPnL: boolean = false;
}
