import {Component, OnDestroy, OnInit} from '@angular/core';
import { MyApiService } from '../../services/API/my-api.service';
import { SpinnerService } from '../../services/spinner.service';
import { Studie } from '../../models/studie';
import { StudiesApiService } from '../../services/API/studies-api.service';
import { AlertService } from '../../services/alert.service';
import {TokenrefresherService} from '../../services/API/tokenrefresher.service';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {ISubscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-my-studies',
  templateUrl: './my-studies.component.html',
  styleUrls: ['./my-studies.component.css']
})
export class MyStudiesComponent implements OnInit, OnDestroy {

  studies: Studie[] = [];

  // is needed for the unsubscribe modal
  selectedStudyNameJson = {'selectedStudyName' : ''};
  selectedStudyId = 0;

  httpRequestIsLoading = false;

  langChangeSubscription: ISubscription;

  constructor(
    private myapiService: MyApiService,
    private spinnerService: SpinnerService,
    private studiesService: StudiesApiService,
    private alertService: AlertService,
    private tokenrefresher: TokenrefresherService,
    private translate: TranslateService
  ) {
    // listen to language changes
    this.langChangeSubscription = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.ngOnInit();
    });
  }

  ngOnInit() {
    this.spinnerService.showSpinner();
    this.httpRequestIsLoading = true;

    const req = this.myapiService.getmyStudies();
    req.subscribe( resp => {
      const studies = resp['body']['data'];
      // make sure that the array contains nothing (this is the case, when e.g. multiple http requests are
      // in the same time
      if (this.studies.length !== 0) {
        this.studies = [];
      }

      for (const studie of studies) {
        this.studies.push(
          new Studie(
            studie['id'],
            studie['attributes']['name'],
            studie['attributes']['title'],
            studie['attributes']['description'],
            studie['attributes']['picture'],
            studie['attributes']['accesstype'],
            studie['attributes']['is_private'],
            studie['attributes']['is_running']
          )
        );
      }
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

  unsubscribeFromStudy() {
    this.spinnerService.showSpinner();
    const req = this.studiesService.unsubscribeFromStudy(this.selectedStudyId);
    this.httpRequestIsLoading = true;
    req.subscribe( resp => {
      const httpStatus = resp['status'];
      this.httpRequestIsLoading = false;
      this.spinnerService.hideSpinner();
      if (httpStatus === 204) {
        // success
        // show alert
        this.translate.get('SuccessUnsubscribe').subscribe((res: string) => {
          this.alertService.enterMessage(res, 0);
        });
        // delete local data
        this.studies = this.studies.filter(item => item.id !== this.selectedStudyId);
      } else {
        this.translate.get('ErrorSubscribe').subscribe((res: string) => {
          this.alertService.enterMessage(res, 1);
        });
      }
    }, err => {
      const status = err['status'];
      this.httpRequestIsLoading = false;
      this.spinnerService.hideSpinner();
      if (status === 401) {
        // token is expired
        this.tokenrefresher.refreshToken().subscribe(httpStatus => {
          if (httpStatus === 200) {
            this.unsubscribeFromStudy();
          }
        });
      } else {
        this.translate.get('ErrorSubscribe').subscribe((res: string) => {
          this.alertService.enterMessage(res, 1);
        });
      }
    });
  }

  // is needed for the unsubscribe-modal
  changeSelectedStudy(studyName: string, studyId: number) {
    this.selectedStudyNameJson = { 'selectedStudyName' : studyName};
    this.selectedStudyId = studyId;
  }

}
