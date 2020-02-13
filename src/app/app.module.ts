import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { OrdersgridComponent } from './ordersgrid/ordersgrid.component';
import { MessageComponent } from './message/message.component';
import { PricegridComponent } from './pricegrid/pricegrid.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    OrdersgridComponent,
    MessageComponent,
    PricegridComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
