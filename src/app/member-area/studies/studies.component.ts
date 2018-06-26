import {Component, OnDestroy, OnInit} from '@angular/core';
import { StudiesApiService } from '../../services/API/studies-api.service';
import { Studie } from '../../models/studie';
import { SpinnerService } from '../../services/spinner.service';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { Pagination } from '../../models/pagination';
import {TokenrefresherService} from '../../services/API/tokenrefresher.service';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {ISubscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-studies',
  templateUrl: './studies.component.html',
  styleUrls: ['./studies.component.css']
})
export class StudiesComponent implements OnInit, OnDestroy {

  studies: Studie[] = [];
  pagination: Pagination = new Pagination(0, 0, 0, 0, 0);

  // is needed for the subscribe modal
  selectedStudyNameJson = {'selectedStudyName' : ''};
  selectedStudyId = 0;
  isSelectedStudyPrivate = false;
  studyPassword = '';

  langChangeSubscription: ISubscription;

  constructor(
    private studiesApi: StudiesApiService,
    private spinnerService: SpinnerService,
    private router: Router,
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
    this.getDataFromAPI(1);
  }

  // unsubscribes when the component is destroyed
  ngOnDestroy() {
    // do not refresh the component, on a languageChange
    this.langChangeSubscription.unsubscribe();
  }

  getDataFromAPI(pageNumber: number) {
    const req = this.studiesApi.getAllStudies(pageNumber);
    req.subscribe( resp => {
      // make sure that the array contains nothing (this is the case, when e.g. multiple http requests are
      // in the same time
      if (this.studies.length !== 0) {
        this.studies = [];
      }
      // studies
      const studies = resp['body']['data'];
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

      // pagination
      const paginationHttp = resp['body']['meta']['pagination'];
      this.pagination = new Pagination(
        paginationHttp['total'],
        paginationHttp['count'],
        paginationHttp['per_page'],
        paginationHttp['current_page'],
        paginationHttp['total_pages']
      );

      this.spinnerService.hideSpinner();
    }, err => {
      const status = err['status'];
      this.spinnerService.hideSpinner();
      if (status === 401) {
        // token is expired
        this.tokenrefresher.refreshToken().subscribe(httpStatus => {
          if (httpStatus === 200) {
            this.getDataFromAPI(pageNumber);
          }
        });
      }
    });
  }

  subscribeToStudy() {
    this.spinnerService.showSpinner();
    const req = this.studiesApi.subscribeToStudy(this.selectedStudyId, this.studyPassword);
    req.subscribe( resp => {
      const httpStatus = resp['status'];
      this.spinnerService.hideSpinner();
      if (httpStatus === 201) {
        this.translate.get('SuccessSubscription').subscribe((res: string) => {
          this.alertService.enterMessage(res, 0);
        });
        this.router.navigate(['/member/mystudies']);
      } else if (httpStatus === 202) {
        // invitation
        this.translate.get('RequestSend').subscribe((res: string) => {
          this.alertService.enterMessage(res, 0);
        });
        this.router.navigate(['/member/mystudies']);
      } else if (httpStatus === 400) {
        // missing password
        this.translate.get('EnterPW').subscribe((res: string) => {
          this.alertService.enterMessage(res, 1);
        });
      } else if (httpStatus === 403) {
        // wrong password
        this.translate.get('WrongPW').subscribe((res: string) => {
          this.alertService.enterMessage(res, 1);
        });
      } else if (httpStatus === 409) {
        // already subscribed
        this.translate.get('AlreadySubscribed').subscribe((res: string) => {
          this.alertService.enterMessage(res, 1);
        });
      } else {
        this.translate.get('someErr').subscribe((res: string) => {
          this.alertService.enterMessage(res, 1);
        });
      }
    }, err => {
      const httpStatus = err['status'];
      this.spinnerService.hideSpinner();
      if (httpStatus === 201) {
        this.translate.get('SuccessSubscription').subscribe((res: string) => {
          this.alertService.enterMessage(res, 0);
        });
        this.router.navigate(['/member/mystudies']);
      } else if (httpStatus === 202) {
        // invitation
        this.translate.get('RequestSend').subscribe((res: string) => {
          this.alertService.enterMessage(res, 0);
        });
        this.router.navigate(['/member/mystudies']);
      } else if (httpStatus === 400) {
        // missing password
        this.translate.get('EnterPW').subscribe((res: string) => {
          this.alertService.enterMessage(res, 1);
        });
      } else if (httpStatus === 403) {
        // wrong password
        this.translate.get('WrongPW').subscribe((res: string) => {
          this.alertService.enterMessage(res, 1);
        });
      } else if (httpStatus === 409) {
        // already subscribed
        this.translate.get('AlreadySubscribed').subscribe((res: string) => {
          this.alertService.enterMessage(res, 1);
        });
      } else if (httpStatus === 401) {
        // token is expired
        this.tokenrefresher.refreshToken().subscribe(status => {
          if (status === 200) {
            this.subscribeToStudy();
          }
        });
      } else {
        this.translate.get('someErr').subscribe((res: string) => {
          this.alertService.enterMessage(res, 1);
        });
      }
    });
  }

  // is needed for subscription
  changeSelectedStudy(studyName: string, studyId: number, accesstype: string) {
    this.selectedStudyNameJson = { 'selectedStudyName' : studyName};
    this.selectedStudyId = studyId;
    if (accesstype === 'password') {
      this.isSelectedStudyPrivate = true;
    } else {
      this.isSelectedStudyPrivate = false;
    }
  }

  // 0 => previous; 1 => next
  changePage(direction: number) {
    if (direction === 0) {
      this.spinnerService.showSpinner();
      this.studies = [];
      this.getDataFromAPI(this.pagination.current_page - 1);
    } else if (direction === 1) {
      this.spinnerService.showSpinner();
      this.studies = [];
      this.getDataFromAPI(this.pagination.current_page + 1);
    }
  }

}
