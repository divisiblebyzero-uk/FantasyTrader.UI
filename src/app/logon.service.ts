import { Injectable } from '@angular/core';
import { Log, LogLevel } from './log';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogonService {

  constructor() { }

  isAuthenticated: boolean;
  isAuthenticatedObservable: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  authToken: string;

  private log: Log = new Log('LogonService', LogLevel.Info);

  setAuthenticated(authenticated:boolean): void {
    this.log.debug("Logon Service: setting authenticated to " + authenticated);
    this.isAuthenticated = authenticated;
    this.isAuthenticatedObservable.next(this.isAuthenticated);
  }

  setAuthToken(authToken: string): void {
    this.log.debug("Logon Service: setting authToken to " + authToken);
    this.authToken = authToken;
  }

  getAuthStatusChanges(): Observable<boolean> {
    return this.isAuthenticatedObservable.asObservable();
  }
}
