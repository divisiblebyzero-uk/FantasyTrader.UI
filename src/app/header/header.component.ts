import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { Router } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';
import { OrderService } from '../order.service';
import { LogonService } from '../logon.service';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private messageService: MessageService,
    private oktaAuth: OktaAuthService,
    public orderService: OrderService,
    private logonService: LogonService
    ) {
  }
  isAuthenticated: boolean;

  login() {
    this.oktaAuth.loginRedirect('/');
  }

  logout() {
    this.oktaAuth.logout('/');
  }

  user: any;
  username: string;

  async ngOnInit() {
    this.logonService.getAuthStatusChanges().subscribe( {
      next(isAuth) { console.log("Status change: " + isAuth);},
      complete() { this.messageService.add("wtf?");}
    });
    this.logonService.setAuthToken(await this.oktaAuth.getAccessToken());
    this.logonService.setAuthenticated(await this.oktaAuth.isAuthenticated());
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    this.oktaAuth.getUser().then(u => {
      this.messageService.add("Okta Auth: " + JSON.stringify(u));
      this.user = u;
      this.username = u.name;
      this.messageService.add("username is: " + this.username);
    });
  }

}
