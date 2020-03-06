import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Account, PriceGrid, PriceGridEntry } from './entities';
import { Log, LogLevel } from './log';
import { LogonService } from './logon.service';
import { OktaAuthService } from '@okta/okta-angular';

@Injectable({
  providedIn: 'root'
})
export class PricegridService {

  constructor(private http: HttpClient, private logonService: LogonService, private oktaAuthService: OktaAuthService ) { }

  private log: Log = new Log('PricegridService', LogLevel.Info);
  private priceGridsUrl = "https://localhost:5001/api/pricegrids";
  private priceGridEntriesUrl = "https://localhost:5001/api/pricegridentries";
  private accountsUrl = "https://localhost:5001/api/accounts";

  private authToken: string;

  private priceGrids: PriceGrid[];

  private async getAuthToken() {
    this.log.info("! getting authtoken");
    if (this.authToken) return this.authToken;
    this.authToken = await this.oktaAuthService.getAccessToken();
    this.log.info("AuthToken is: " + this.authToken);
    return this.authToken;
  }

  public getAccounts(): Observable<Account[]> {
    this.log.debug('PriceGridService: fetching accounts');
    return this.http.get<Account[]>(this.accountsUrl)
    .pipe(
      tap(_ => this.log.debug('fetched accounts')),
      catchError(this.handleError<Account[]>('getAccounts', []))
    );;
  }

  public async getPriceGrids() {
    const authToken = await this.oktaAuthService.getAccessToken();
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + authToken);

    this.http.get<PriceGrid[]>(this.priceGridsUrl, {headers})
      .pipe(
        tap(_ => this.log.debug('fetched price grids')),
        catchError(this.handleError<PriceGrid[]>('getPriceGrids', []))
      )
      .subscribe(priceGrids => this.priceGrids = priceGrids);
  }

  public getPriceGridEntries(priceGridName: string): Observable<PriceGridEntry[]> {
    this.log.debug('PriceGridService: fetching price grids entries');

    return this.http.get<PriceGridEntry[]>(this.priceGridEntriesUrl)
      .pipe(
        tap(_ => this.log.debug('fetched price grid entries')),
        catchError(this.handleError<PriceGridEntry[]>('getPriceGridEntries', []))
      );;
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log.error(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
