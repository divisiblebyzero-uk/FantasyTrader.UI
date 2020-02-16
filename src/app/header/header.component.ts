import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { Router } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private messageService: MessageService, private oktaAuth: OktaAuthService, private orderService: OrderService) {
    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean)  => this.isAuthenticated = isAuthenticated
    );
  }

  isAuthenticated: boolean;
  login() {
    this.oktaAuth.loginRedirect('/');
  }

  logout() {
    this.oktaAuth.logout('/');
  }


  printDetails() {
    this.messageService.add("Header: here's the deets: " + JSON.stringify(this.oktaAuth.getAccessToken()));
    this.oktaAuth.getUser().then(t => this.messageService.add("Promise fulfilled: " + JSON.stringify(t)));
    this.oktaAuth.getAccessToken().then(t => this.orderService.setAccessToken(t));
  }

  user: any;
  username: string;

  async ngOnInit() {
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    this.oktaAuth.getUser().then(u => {this.user = u;
    this.username = u.name;
  this.messageService.add("username is: " + this.username)});
  }

}
