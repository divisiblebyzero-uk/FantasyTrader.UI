import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { OrdersgridComponent } from './ordersgrid/ordersgrid.component';


@NgModule({
  declarations: [
    AppComponent,
    OrdersgridComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
