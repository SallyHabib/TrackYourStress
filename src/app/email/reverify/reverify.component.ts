import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { UserService } from '../../services/API/user.service';
import { SpinnerService } from '../../services/spinner.service';
import { ActivatedRoute } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-reverify',
  templateUrl: './reverify.component.html',
  styleUrls: ['./reverify.component.css']
})
export class ReverifyComponent implements OnInit {

  tokenToReVerify: string;

  constructor(
    private route: ActivatedRoute,
    private spinner: SpinnerService,
    private userService: UserService,
    private alertService: AlertService,
    private translate: TranslateService
  ) {
    // get the token
    this.route.queryParams.subscribe(params => {
      this.tokenToReVerify = params['token'];
    });
  }

  ngOnInit() {
    this.spinner.showSpinner();
    const req = this.userService.verifyTokenToAPI(this.tokenToReVerify);
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
