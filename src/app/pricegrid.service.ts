import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { PriceGrid, PriceGridEntry } from './pricegrid';
import { Account } from './account';

@Injectable({
  providedIn: 'root'
})
export class PricegridService {

  constructor(private http: HttpClient, private messageService: MessageService) { }

  private priceGridsUrl = "https://localhost:5001/api/pricegrids";
  private priceGridEntriesUrl = "https://localhost:5001/api/pricegridentries";
  private accountsUrl = "https://localhost:5001/api/accounts";

  public getAccounts(): Observable<Account[]> {
    this.messageService.add('PriceGridService: fetching accounts');
    return this.http.get<Account[]>(this.accountsUrl)
    .pipe(
      tap(_ => this.log('fetched accounts')),
      catchError(this.handleError<Account[]>('getAccounts', []))
    );;
  }

  public getPriceGrids(): Observable<PriceGrid[]> {
    this.messageService.add('PriceGridService: fetching price grids');

    return this.http.get<PriceGrid[]>(this.priceGridsUrl)
      .pipe(
        tap(_ => this.log('fetched price grids')),
        catchError(this.handleError<PriceGrid[]>('getPriceGrids', []))
      );;
  }

  public getPriceGridEntries(priceGridName: string): Observable<PriceGridEntry[]> {
    this.messageService.add('PriceGridService: fetching price grids entries');

    return this.http.get<PriceGridEntry[]>(this.priceGridEntriesUrl)
      .pipe(
        tap(_ => this.log('fetched price grid entries')),
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
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  private log(message: string) {
    this.messageService.add(`PriceGridService: ${message}`);
  }

}
