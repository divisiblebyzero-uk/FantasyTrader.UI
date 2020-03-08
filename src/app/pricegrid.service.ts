import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Account, PriceGrid, PriceGridEntry } from './entities';
import { Log, LogLevel } from './log';
import { LogonService } from './logon.service';

@Injectable({
  providedIn: 'root'
})
export class PricegridService {

  constructor(private http: HttpClient, private logonService: LogonService) { }

  private log: Log = new Log('PricegridService', LogLevel.Info);
  private priceGridsUrl = "https://localhost:5001/api/pricegrids";
  private priceGridEntriesUrl = "https://localhost:5001/api/pricegridentries";
  private accountsUrl = "https://localhost:5001/api/accounts";

  private authToken: string;

  public priceGrids: PriceGrid[];
  public priceGridEntries: PriceGridEntry[];

  public getAccounts(): Observable<Account[]> {
    this.log.debug('PriceGridService: fetching accounts');
    return this.http.get<Account[]>(this.accountsUrl)
    .pipe(
      tap(_ => this.log.debug('fetched accounts')),
      catchError(this.handleError<Account[]>('getAccounts', []))
    );;
  }

  public async getPriceGrids() {
    
    this.http.get<PriceGrid[]>(this.priceGridsUrl)
      .pipe(
        tap(_ => this.log.info('fetched price grids')),
        catchError(this.handleError<PriceGrid[]>('getPriceGrids', []))
      )
      .subscribe(priceGrids => this.priceGrids = priceGrids);
  }

  public getPriceGridEntries(priceGridName: string) {
    this.log.debug('PriceGridService: fetching price grids entries');

    this.http.get<PriceGridEntry[]>(this.priceGridEntriesUrl)
      .pipe(
        tap(_ => this.log.debug('fetched price grid entries')),
        catchError(this.handleError<PriceGridEntry[]>('getPriceGridEntries', []))
      )
      .subscribe(priceGridEntries => this.priceGridEntries = priceGridEntries);
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
