import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: [Date, string][] = [];

  public add(message: string) {
    this.messages.push([new Date(), message]);
  }

  public clear() {
    this.messages = [];
  }
}