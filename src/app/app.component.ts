import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FrontEnd';
  public showPrices: boolean = false;
  public showOrders: boolean = true;
  public showPnL: boolean = false;
}
