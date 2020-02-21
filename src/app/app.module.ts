import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { SocialLoginModule, AuthServiceConfig } from 'angular-6-social-login'; 
import { GoogleLoginProvider, FacebookLoginProvider, AuthService } 
         from 'angular-6-social-login'; 
import { AppComponent } from './app.component';
import { OrdersgridComponent } from './ordersgrid/ordersgrid.component';
import { MessageComponent } from './message/message.component';
import { PricegridComponent } from './pricegrid/pricegrid.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

export function socialConfigs() {  
  const config = new AuthServiceConfig(  
    [  

      {  
        id: GoogleLoginProvider.PROVIDER_ID,  
        provider: new GoogleLoginProvider('607720498390-7bmr0378uigq3gig55976d441hoajihg.apps.googleusercontent.com')  
      }  
    ]  
  );  
  return config;  
}  



@NgModule({
  declarations: [
    AppComponent,
    OrdersgridComponent,
    MessageComponent,
    PricegridComponent,
    HeaderComponent,
    DashboardComponent    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [
    AuthService,  
    {  
      provide: AuthServiceConfig,  
      useFactory: socialConfigs  
    }  

  ],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
