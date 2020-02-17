import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogonService {

  constructor(private messageService: MessageService) { }

  isAuthenticated: boolean;
  isAuthenticatedObservable: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  authToken: string;

  setAuthenticated(authenticated:boolean): void {
    this.messageService.add("Logon Service: setting authenticated to " + authenticated);
    this.isAuthenticated = authenticated;
    this.isAuthenticatedObservable.next(this.isAuthenticated);
  }

  setAuthToken(authToken: string): void {
    this.messageService.add("Logon Service: setting authToken to " + authToken);
    this.authToken = authToken;
  }

  getAuthStatusChanges(): Observable<boolean> {
    return this.isAuthenticatedObservable.asObservable();
  }
}
