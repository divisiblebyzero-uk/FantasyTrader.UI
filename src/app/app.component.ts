import { Component } from '@angular/core';
import { LogonService } from './logon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public logonService: LogonService) { }
}
