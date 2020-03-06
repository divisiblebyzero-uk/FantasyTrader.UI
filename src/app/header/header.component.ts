import { Component, OnInit } from '@angular/core';
import { Log, LogLevel } from '../log';
import { Router } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';
import { CommsService } from '../comms.service';
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
    private oktaAuth: OktaAuthService,
    public commsService: CommsService,
    private logonService: LogonService
    ) {
  }
  isAuthenticated: boolean;

  private log: Log = new Log('HeaderComponent', LogLevel.Info);

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
      complete() { this.log.error("wtf?");}
    });
    this.logonService.setAuthToken(await this.oktaAuth.getAccessToken());
    this.logonService.setAuthenticated(await this.oktaAuth.isAuthenticated());
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    this.oktaAuth.getUser().then(u => {
      this.log.debug("Okta Auth: " + JSON.stringify(u));
      this.user = u;
      this.username = u.name;
      this.log.debug("username is: " + this.username);
    });
    if (this.isAuthenticated) {
      this.commsService.startConnections();
    }
  }

}
