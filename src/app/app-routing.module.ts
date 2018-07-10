import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { TipsComponent } from './tips/tips.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {RequestPwresetComponent} from './request-pwreset/request-pwreset.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'reg', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'requestpwreset', component: RequestPwresetComponent},
  { path: 'about', component: AboutComponent },
  {path: 'tips',component: TipsComponent},

  // else
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
