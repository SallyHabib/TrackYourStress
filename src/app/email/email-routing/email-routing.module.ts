import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EmailComponent } from '../email/email.component';
import { VerifyComponent } from '../verify/verify.component';
import { ReverifyComponent } from '../reverify/reverify.component';
import {PasswordResetComponent} from '../password-reset/password-reset.component';

const memberRoutes: Routes = [
  {
    path: 'email',
    component: EmailComponent,
    children: [
      {
        path: '',
        redirectTo: '/email',
        pathMatch: 'full'
      },
      {
        path: 'user/verify',
        component: VerifyComponent
      },
      {
        path: 'user/reverify',
        component: ReverifyComponent
      },
      {
        path: 'password/reset',
        component: PasswordResetComponent
      }
    ]
  }
  ];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(memberRoutes)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class EmailRoutingModule { }
