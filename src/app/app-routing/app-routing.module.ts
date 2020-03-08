import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component'
import { ProfileComponent } from '../profile/profile.component';
import { AuthGuard } from '../auth.guard';
import { InterceptorService } from '../interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
    }, {
      path: 'dashboard',
      redirectTo: '/',
      pathMatch: 'full',
      canActivate: [AuthGuard]
    },
    {
      path: 'profile',
      component: ProfileComponent,
      canActivate: [AuthGuard]
    }
];
  
@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: InterceptorService,
        multi: true
      }
    ],
    declarations: []
})
export class AppRoutingModule { }