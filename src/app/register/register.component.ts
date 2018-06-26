import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/API/user.service';
import { Router } from '@angular/router';

import { User } from '../models/user';
import { AlertService } from '../services/alert.service';
import { SpinnerService } from '../services/spinner.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router,
    private alertService: AlertService,
    private spinnerService: SpinnerService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
  }

  register(registrationForm: NgForm) {
    this.spinnerService.showSpinner();
    const email = registrationForm.controls['email'].value;
    const password = registrationForm.controls['password'].value;
    const passwordAgain = registrationForm.controls['passwordAgain'].value;
    const nickname = registrationForm.controls['nickname'].value;

    const tempUser = new User(email, password, passwordAgain, nickname);
    const req = this.userService.registerUserToAPI(tempUser);

    req.subscribe( resp => {
      this.spinnerService.hideSpinner();
      const httpStatus = resp['status'];
      if (httpStatus === 201) {
        this.translate.get('SuccessReg').subscribe((res: string) => {
          this.alertService.enterMessage(res, 0);
        });
      } else {
        this.translate.get('someErr').subscribe((res: string) => {
          this.alertService.enterMessage(res, 1);
        });
      }
    }, err => {
      this.spinnerService.hideSpinner();
      const httpStatus = err['status'];
      if (httpStatus === 409) {
        this.translate.get('UsedMail').subscribe((res: string) => {
          this.alertService.enterMessage(res, 1);
        });
      } else if (httpStatus === 201) {
        this.translate.get('SuccessReg').subscribe((res: string) => {
          this.alertService.enterMessage(res, 0);
        });
      } else if (httpStatus === 422) {
        this.translate.get('ErrorReg').subscribe((res: string) => {
          this.alertService.enterMessage(res, 1);
        });
      } else {
        this.translate.get('someErr').subscribe((res: string) => {
          this.alertService.enterMessage(res, 1);
        });
      }
    });
  }

}
