import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { TipsComponent } from './tips/tips.component';
import { TipsDetailsComponent } from './tips-details/tips-details.component'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {RequestPwresetComponent} from './request-pwreset/request-pwreset.component';
import { q03S02 } from './q03-s02/q03-S02.component';
import { q02Component } from './q02/q02.component';
import { q03Component } from './q03/q03.component';
import {achievementsComponent} from './achievements/achievements.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'reg', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'requestpwreset', component: RequestPwresetComponent},
  { path: 'about', component: AboutComponent },
  {path: 'tips',component: TipsComponent},
  {path: 'answersQuestion2',component: q03S02},
  {path: 'questionnaire2',component: q02Component},
  {path: 'questionnaire3',component: q03Component},
  {path: 'tipsDetails/:id',component: TipsDetailsComponent},
  {path:'achievements',component:achievementsComponent},

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
