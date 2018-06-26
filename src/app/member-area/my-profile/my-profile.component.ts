import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';
import { MyApiService } from '../../services/API/my-api.service';
import { NgForm } from '@angular/forms';
import { AlertService } from '../../services/alert.service';
import {TokenrefresherService} from '../../services/API/tokenrefresher.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  // initial values
  name = 'Loading...';
  email = 'Loading...';
  firstname = 'Loading...';
  lastname = 'Loading...';

  profileIsChangable = false;
  whichSex: number[] = [];

  constructor(
    private myapiService: MyApiService,
    private spinnerService: SpinnerService,
    private alertService: AlertService,
    private tokenrefresher: TokenrefresherService,
    private translate: TranslateService
  ) {
    this.translate.get('Loading').subscribe((res: string) => {
      this.name = res;
      this.email = res;
      this.firstname = res;
      this.lastname = res;
    });
  }

  ngOnInit() {
    this.spinnerService.showSpinner();

    const req = this.myapiService.getmyProfile();
    req.subscribe( resp => {
      const profileData = resp.body['data']['attributes'];
      this.name = profileData['name'];
      this.email = profileData['email'];
      this.firstname = profileData['firstname'];
      this.lastname = profileData['lastname'];
      this.checkSex(profileData['sex']);
      this.spinnerService.hideSpinner();
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

  makeProfileEditable() {
    this.profileIsChangable = true;
  }

  makeSexStringToNumber(): number {
    if (this.whichSex[0] === 1) {
      return 0;
    } else if (this.whichSex[1] === 1) {
      return 1;
    } else if (this.whichSex[2] === 1) {
      return 2;
    } /*else if (this.whichSex[9] === 1) {
      return 9;
    } */
  }

  // sets the sex in the UI
  checkSex(index: number) {
    // reset all values to false
      for (const singleSex in this.whichSex) {
        if (this.whichSex.hasOwnProperty(singleSex)) {
          this.whichSex[singleSex] = 0;
        }
      }
      this.whichSex[index] = 1;
  }

  changeProfile(profileForm: NgForm) {
    const name = profileForm.controls['name'].value;
    const firstname = profileForm.controls['firstname'].value;
    const lastname = profileForm.controls['lastname'].value;
    const sexNumber = this.makeSexStringToNumber();

    this.spinnerService.showSpinner();
    const req = this.myapiService.updateMyProfile(name, firstname, lastname, sexNumber);
    req.subscribe( resp => {
      const status = resp['status'];
      if (status === 200) {
        this.spinnerService.hideSpinner();

        // update the local values
        this.name = name;
        this.firstname = firstname;
        this.lastname = lastname;
        this.checkSex(sexNumber);

        this.translate.get('SuccessChangeProfile').subscribe((res: string) => {
          this.alertService.enterMessage(res, 0);
        });

        // reset the form
        profileForm.resetForm();
        profileForm.setValue({name: this.name , email: this.email, firstname: this.firstname,
          lastname: this.lastname});

        // lock the UI
        this.profileIsChangable = false;
      } else {
        this.spinnerService.hideSpinner();
        this.translate.get('ErrorChangeProfile').subscribe((res: string) => {
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
            this.changeProfile(profileForm);
          }
        });
      } else {
        this.translate.get('ErrorChangeProfile').subscribe((res: string) => {
          this.alertService.enterMessage(res, 1);
        });
        profileForm.setValue({name: this.name , email: this.email, firstname: this.firstname,
        lastname: this.lastname});
      }
    });
  }

}
