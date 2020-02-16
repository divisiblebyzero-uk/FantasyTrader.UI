import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component'
import {
    OktaAuthModule,
    OktaCallbackComponent,
  } from '@okta/okta-angular';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
    }, {
      path: 'x',
      redirectTo: '/dashboard',
      pathMatch: 'full'
    },
    { path: 'implicit/callback', component: OktaCallbackComponent }
];

const config = {
    issuer: 'https://dev-648496.okta.com/oauth2/default',
    redirectUri: 'http://localhost:4200/implicit/callback',
    clientId: '0oa29se01mINjBjA14x6',
    scope: 'openid profile email'
  };
  
@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        OktaAuthModule.initAuth(config)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class AppRoutingModule { }