import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpinnerService } from '../../services/spinner.service';
import { UserService } from '../../services/API/user.service';
import { AlertService } from '../../services/alert.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  tokenToVerify: string;

  constructor(
    private route: ActivatedRoute,
    private spinner: SpinnerService,
    private userService: UserService,
    private alertService: AlertService,
    private translate: TranslateService
  ) {
    // get the token
    this.route.queryParams.subscribe(params => {
      this.tokenToVerify = params['token'];
    });
  }

  ngOnInit() {
    this.spinner.showSpinner();
    const req = this.userService.verifyTokenToAPI(this.tokenToVerify);
    req.subscribe( resp => {
      this.spinner.hideSpinner();
      const status = resp['status'];
      if (status === 201) {
        this.translate.get('RegComplete').subscribe((res: string) => {
          this.alertService.enterMessage(res, 0);
        });
      }
    }, err => {
      this.spinner.hideSpinner();
      const status = err['status'];
      if (status === 400) {
        this.translate.get('invalToken').subscribe((res: string) => {
          this.alertService.enterMessage(res, 1);
        });
      } else if (status === 201) {
        this.translate.get('RegComplete').subscribe((res: string) => {
          this.alertService.enterMessage(res, 0);
        });
      } else {
        this.translate.get('someErr').subscribe((res: string) => {
          this.alertService.enterMessage(res, 1);
        });
      }
    });
  }

}
