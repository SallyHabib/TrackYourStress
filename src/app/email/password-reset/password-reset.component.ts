import { Component, OnInit } from '@angular/core';
import {AlertService} from '../../services/alert.service';
import {SpinnerService} from '../../services/spinner.service';
import {UserService} from '../../services/API/user.service';
import {ActivatedRoute} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  password: string;
  passwordConf: string;
  resetToken: string;

  constructor(
    private route: ActivatedRoute,
    private alertService: AlertService,
    private spinnerService: SpinnerService,
    private userService: UserService,
    private translate: TranslateService
  ) {
    this.route.queryParams.subscribe(params => {
      this.resetToken = params['token'];
    });
  }

  ngOnInit() {
  }

  resetPassword() {
    this.spinnerService.showSpinner();
    const req = this.userService.setNewPassword(this.resetToken, this.password, this.passwordConf);
    req.subscribe(resp => {
      console.log(resp);
      this.spinnerService.hideSpinner();
      const status = resp['status'];
      if (status === 204) {
        this.translate.get('ResetSuccess').subscribe((res: string) => {
          this.alertService.enterMessage(res, 0);
        });
      } else {
        this.translate.get('ResetError').subscribe((res: string) => {
          this.alertService.enterMessage(res, 1);
        });
      }
    }, err => {
      this.spinnerService.hideSpinner();
      this.translate.get('ResetError').subscribe((res: string) => {
        this.alertService.enterMessage(res, 1);
      });
    });
  }

}
