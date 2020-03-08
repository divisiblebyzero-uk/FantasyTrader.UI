import { Component, OnInit } from '@angular/core';
import { Log, LogLevel } from '../log';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
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
    public auth: AuthService,
    public commsService: CommsService
    ) {
  }
  isAuthenticated: boolean;

  private log: Log = new Log('HeaderComponent', LogLevel.Info);

  user: any;
  username: string;

  async ngOnInit() {
    this.commsService.startConnections();
  }

}
