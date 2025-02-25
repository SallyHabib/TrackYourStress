import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AlertComponent } from './alert/alert.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { UserService } from './services/API/user.service';
import { AlertService } from './services/alert.service';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarService } from './services/navbar.service';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { TipsComponent } from './tips/tips.component';
import { TipsDetailsComponent } from './tips-details/tips-details.component';
import { q03S02 } from './q03-s02/q03-S02.component';
import { achievementsComponent } from './achievements/achievements.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { SpinnerService } from './services/spinner.service';
import { MemberAreaComponent } from './member-area/member-area/member-area.component';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { LogoutComponent } from './logout/logout.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MyProfileComponent } from './member-area/my-profile/my-profile.component';
import { MemberRoutingModule } from './member-area/member-routing.module';
import { MyStudiesComponent } from './member-area/my-studies/my-studies.component';
import { MyApiService } from './services/API/my-api.service';
import { MyQuestionnairesComponent } from './member-area/my-questionnaires/my-questionnaires.component';
import { QuestionnaireStructureComponent } from './member-area/questionnaire-structure/questionnaire-structure.component';
import { QuestionnaireApiService } from './services/API/questionnaire-api.service';
import { StudiesComponent } from './member-area/studies/studies.component';
import { StudiesApiService } from './services/API/studies-api.service';
import { VerifyComponent } from './email/verify/verify.component';
import { EmailComponent } from './email/email/email.component';
import { EmailRoutingModule } from './email/email-routing/email-routing.module';
import { ReverifyComponent } from './email/reverify/reverify.component';
import {TokenrefresherService} from './services/API/tokenrefresher.service';
import { ChangePasswordComponent } from './member-area/change-password/change-password.component';
import { RequestPwresetComponent } from './request-pwreset/request-pwreset.component';
import { PasswordResetComponent } from './email/password-reset/password-reset.component';
import {TranslateModule, TranslateLoader, TranslateService} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {DeviceDetectorModule} from 'ngx-device-detector';
import {Globals} from './GlobalVars/globals';
import {QuestionnaireService} from './services/questionnaire.service';
import {TipsDialogComponent} from "./tips/tipsDialog.component"
import {q02Component} from "./q02/q02.component";
import {q03Component} from "./q03/q03.component";
import {BootstrapModalModule} from "ng2-bootstrap-modal"
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FlashMessagesModule } from 'angular2-flash-messages';
//import { IgDataChartComponent } from 'igniteui-angular2';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    TipsComponent,
    TipsDetailsComponent,
    q03S02,
    SpinnerComponent,
    MemberAreaComponent,
    LogoutComponent,
    PageNotFoundComponent,
    MyProfileComponent,
    MyStudiesComponent,
    MyQuestionnairesComponent,
    QuestionnaireStructureComponent,
    StudiesComponent,
    VerifyComponent,
    EmailComponent,
    ReverifyComponent,
    ChangePasswordComponent,
    RequestPwresetComponent,
    PasswordResetComponent,
    TipsDialogComponent,
    q02Component,
    q03Component,
    achievementsComponent
   // IgDataChartComponent
  ],
  imports: [
    BrowserModule,

    EmailRoutingModule,
    MemberRoutingModule,
    AppRoutingModule,
    BootstrapModalModule,
    FontAwesomeModule,
    FlashMessagesModule.forRoot(),

    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),

    // device detection
    DeviceDetectorModule.forRoot()
  ],
  providers: [
    AlertService,
    NavbarService,
    SpinnerService,
    AuthService,
    AuthGuardService,
    TranslateService,
    QuestionnaireService,
    //DialogService,

    // API
    MyApiService,
    UserService,
    QuestionnaireApiService,
    StudiesApiService,
    TokenrefresherService,

    // global vars
    Globals
  ],
  entryComponents:[
    TipsDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
