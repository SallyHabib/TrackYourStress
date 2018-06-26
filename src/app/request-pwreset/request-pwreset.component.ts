import { Component, OnInit } from '@angular/core';
import {AlertService} from '../services/alert.service';
import {SpinnerService} from '../services/spinner.service';
import {UserService} from '../services/API/user.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-request-pwreset',
  templateUrl: './request-pwreset.component.html',
  styleUrls: ['./request-pwreset.component.css']
})
export class RequestPwresetComponent implements OnInit {

  constructor(
    private alertService: AlertService,
    private spinnerService: SpinnerService,
    private userService: UserService,
    private translate: TranslateService
  ) { }

  enteredEmail: string;

  ngOnInit() {
  }

  sendInstruktions() {
    this.spinnerService.showSpinner();

    const req = this.userService.requestPWReset(this.enteredEmail);
    req.subscribe(resp => {
      this.spinnerService.hideSpinner();
      const status = resp['status'];
      if (status === 204) {
        this.translate.get('InstrSuccess').subscribe((res: string) => {
          this.alertService.enterMessage(res, 0);
        });
      } else {
        this.translate.get('someErr').subscribe((res: string) => {
          this.alertService.enterMessage(res, 1);
        });
      }
    }, err => {
      this.spinnerService.hideSpinner();
      this.translate.get('someErr').subscribe((res: string) => {
        this.alertService.enterMessage(res, 1);
      });
    });
  }

}
