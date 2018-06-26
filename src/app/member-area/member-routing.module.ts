import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MemberAreaComponent } from './member-area/member-area.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { AuthGuardService as AuthGuard } from '../services/auth-guard.service';
import { MyStudiesComponent } from './my-studies/my-studies.component';
import { MyQuestionnairesComponent } from './my-questionnaires/my-questionnaires.component';
import { QuestionnaireStructureComponent } from './questionnaire-structure/questionnaire-structure.component';
import { StudiesComponent } from './studies/studies.component';
import {ChangePasswordComponent} from './change-password/change-password.component';

const memberRoutes: Routes = [
  {
    path: 'member',
    component: MemberAreaComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: '/member/myquestionnaires',
        pathMatch: 'full'
      },
      {
        path: 'myquestionnaires',
        component: MyQuestionnairesComponent,
      },
      {
        path: 'myquestionnaires/:id',
        component: QuestionnaireStructureComponent
      },
      {
        path: 'mystudies',
        component: MyStudiesComponent
      },
      {
        path: 'myprofile',
        component: MyProfileComponent
      },
      {
        path: 'myprofile/changepw',
        component: ChangePasswordComponent
      },
      {
        path: 'studies',
        component: StudiesComponent
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
export class MemberRoutingModule { }
