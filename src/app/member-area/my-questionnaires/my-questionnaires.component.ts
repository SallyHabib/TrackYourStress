import {Component, OnDestroy, OnInit} from '@angular/core';
import { Questionnaire } from '../../models/questionnaire';
import { MyApiService } from '../../services/API/my-api.service';
import { SpinnerService } from '../../services/spinner.service';
import { Router } from '@angular/router';
import {TokenrefresherService} from '../../services/API/tokenrefresher.service';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {ISubscription} from 'rxjs/Subscription';
import {QuestionnaireService} from '../../services/questionnaire.service';

@Component({
  selector: 'app-my-questionnaires',
  templateUrl: './my-questionnaires.component.html',
  styleUrls: ['./my-questionnaires.component.css']
})
export class MyQuestionnairesComponent implements OnInit, OnDestroy {

  questionnaires: Questionnaire[] = [];
  httpRequestIsLoading = false;

  langChangeSubscription: ISubscription;

  constructor(
    private myapiService: MyApiService,
    private spinnerService: SpinnerService,
    private router: Router,
    private tokenrefresher: TokenrefresherService,
    private translate: TranslateService,
    private questionnaireService: QuestionnaireService
  ) {
    // listen to language changes
    this.langChangeSubscription = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.ngOnInit();
    });
  }

  ngOnInit() {
    this.spinnerService.showSpinner();
    this.httpRequestIsLoading = true;
    this.questionnaires = [];

    const req = this.myapiService.getmyQuestionnaires();
    req.subscribe( resp => {
      const questionnaires = resp['body']['data'];
      // make sure that the array contains nothing (this is the case, when e.g. multiple http requests are
      // in the same time
      if (this.questionnaires.length !== 0) {
        this.questionnaires = [];
      }

      for (const questionnaire of questionnaires) {
        // check whether the flag "every" is set
        const everyArray = questionnaire['attributes']['schedule'][0];
        let every = 0;
        if (everyArray !== undefined) {
          every = everyArray['every'];
        }

        this.questionnaires.push(
          new Questionnaire(
            questionnaire['attributes']['name'], questionnaire['attributes']['title'],
            questionnaire['attributes']['is_active'], questionnaire['attributes']['is_onetime'],
            questionnaire['attributes']['is_multiple'], questionnaire['attributes']['is_filled_out'],
            questionnaire['attributes']['is_schedule_changeable'], questionnaire['attributes']['description'],
            questionnaire['attributes']['introtext'], questionnaire['attributes']['outrotext'],
            questionnaire['id'], every
          )
        );
      }
      this.whichKindOfQuestToShow();
      this.spinnerService.hideSpinner();
      this.httpRequestIsLoading = false;
    }, err => {
      const status = err['status'];
      this.spinnerService.hideSpinner();
      if (status === 401) {
        // token is expired
        this.tokenrefresher.refreshToken().subscribe(httpStatus => {
          if (httpStatus === 200) {
            this.ngOnInit();
          }
        });
      }
    });
  }

  // unsubscribes when the component is destroyed
  ngOnDestroy() {
    // do not refresh the component, on a languageChange
    this.langChangeSubscription.unsubscribe();
  }

  // navigate to selected questionnaire
  changeRouteToQuestStruct(questionnaire: Questionnaire) {
    const questionnaireStructURL = '/member/myquestionnaires/' + questionnaire.id;
    this.questionnaireService.selectedQuestionnaire = questionnaire;
    this.router.navigate([questionnaireStructURL]);
  }

  whichKindOfQuestToShow() {
    let onlyOneTimeAllowed = false;
    for (const questionnaire of this.questionnaires) {
      // questionnaire is_onetime and should be filled out
      if (questionnaire.is_active === 1 && questionnaire.is_filled_out === false && questionnaire.is_onetime === 1) {
        this.showOnlyOnetimeQuest();
        onlyOneTimeAllowed = true;
        // abort the for-loop, because the condition is fulfilled, when only one questionnaire is a onetime-one
        break;
      }
    }
    if (!onlyOneTimeAllowed) {
      this.showOnlyMultipleQuest();
    }
  }

  showOnlyOnetimeQuest() {
    this.questionnaires = this.questionnaires.filter(item => (item.is_onetime === 1 && item.is_active === 1
      && item.is_filled_out === false));
  }

  showOnlyMultipleQuest() {
    this.questionnaires = this.questionnaires.filter(item => (item.is_active === 1 && item.is_multiple === 1));
  }


}
