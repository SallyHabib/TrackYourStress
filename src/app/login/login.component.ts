import {Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../models/user';
import { UserService } from '../services/API/user.service';
import { AlertService } from '../services/alert.service';
import { NavbarService } from '../services/navbar.service';
import { SpinnerService } from '../services/spinner.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  useEmailToLogin = true;

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private navbarService: NavbarService,
    private spinnerService: SpinnerService,
    private router: Router,
    private translate: TranslateService
  ) { }

  ngOnInit() {}

  login(loginForm: NgForm) {
    this.spinnerService.showSpinner();

    let tempUser = null;
    if (this.useEmailToLogin === true) {
      const email = loginForm.controls['email'].value;
      const password = loginForm.controls['password'].value;
      tempUser = new User(email, password, '', '');
    } else {
      const nickname = loginForm.controls['email'].value;
      const password = loginForm.controls['password'].value;
      tempUser = new User('', password, '', nickname);
    }

    const req = this.userService.loginUserToAPI(tempUser);
    req.subscribe( resp => {
      // save the token
      const token = resp.body['data']['attributes']['token'];
      localStorage.setItem('token', token);

      this.spinnerService.hideSpinner();
      this.navbarService.loginUser(true);
      this.router.navigate(['/member']);
    }, err => {
      this.spinnerService.hideSpinner();
      this.translate.get('LoginError').subscribe((res: string) => {
        this.alertService.enterMessage(res, 1);
      });
    });
  }

  toggleLoginCredentials() {
    if (this.useEmailToLogin === true) {
      this.useEmailToLogin = false;
    } else {
      this.useEmailToLogin = true;
    }
  }

}
