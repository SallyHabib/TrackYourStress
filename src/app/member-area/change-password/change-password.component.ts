import { Component, OnInit } from '@angular/core';
import {MyApiService} from '../../services/API/my-api.service';
import {SpinnerService} from '../../services/spinner.service';
import {AlertService} from '../../services/alert.service';
import {TokenrefresherService} from '../../services/API/tokenrefresher.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(
    private myapiService: MyApiService,
    private spinnerService: SpinnerService,
    private alertService: AlertService,
    private tokenrefresher: TokenrefresherService,
    private translate: TranslateService
  ) { }

  password: string;
  passwordConf: string;

  ngOnInit() {
  }

  changePassword() {
    this.spinnerService.showSpinner();

    const req = this.myapiService.updatePassword(this.password, this.passwordConf);
    req.subscribe(resp => {
      this.spinnerService.hideSpinner();
      const status = resp['status'];
      if (status === 204) {
        this.translate.get('ChangeSuccess').subscribe((res: string) => {
          this.alertService.enterMessage(res, 0);
        });
      } else {
        this.translate.get('someErr').subscribe((res: string) => {
          this.alertService.enterMessage(res, 1);
        });
      }
    }, err => {
      this.spinnerService.hideSpinner();
      const status = err['status'];
      if (status === 401) {
        // token is expired
        this.tokenrefresher.refreshToken().subscribe(httpStatus => {
          if (httpStatus === 200) {
            this.changePassword();
          }
        });
      } else {
        this.translate.get('someErr').subscribe((res: string) => {
          this.alertService.enterMessage(res, 1);
        });
      }
    });
  }

}
