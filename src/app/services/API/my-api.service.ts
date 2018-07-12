import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';
import {Globals} from '../../GlobalVars/globals';

@Injectable()
export class MyApiService {

  constructor(
    private http: HttpClient,
    private translate: TranslateService,
    private globals: Globals
  ) { }

  getTips(page:number){
    const tipsUrl = 'https://api.dummy.trackyourhealth.net/api/v1/tips?'+ 'page=' + page;
    console.log(this.translate.currentLang)
    const headers = new HttpHeaders().set('Accept-Language', this.translate.currentLang);
    return this.http.get(tipsUrl, {observe: 'response', headers: headers});
    //return this.http.get(tipsUrl, {observe: 'response'});
  }
  getTipsDetails(tip:number){
    const tipsDetailsUrl = 'https://api.dummy.trackyourhealth.net/api/v1/tips/'+ tip;
    console.log(this.translate.currentLang)
    const headers = new HttpHeaders().set('Accept-Language', this.translate.currentLang);
    return this.http.get(tipsDetailsUrl, {observe: 'response', headers: headers});
    //return this.http.get(tipsUrl, {observe: 'response'});
  }
  getmyProfile() {
    const token = localStorage.getItem('token');
    const myProfileURL = this.globals.apiEndPoint + '/api/v1/my/profile?token=' + token;
    return this.http.get(myProfileURL, {observe: 'response'});
  }

  updateMyProfile(name: string, firstname: string, lastname: string, sex: number) {
    const token = localStorage.getItem('token');
    const updateProfileURL = this.globals.apiEndPoint + '/api/v1/my/profile?token=' + token;
    const reqJsonData = {
      'data' : {
        'type' : 'users',
        'attributes' : {
          'name' : name,
          'firstname' : firstname,
          'lastname' : lastname,
          'sex' : sex,
          'settings' : {'locale' : 'de'}
        }
      }
    };
    return this.http.patch(updateProfileURL, reqJsonData, {observe: 'response'});
  }

  updatePassword(password: string, passwordConf: string) {
    const token = localStorage.getItem('token');
    const updatePasswordURL = this.globals.apiEndPoint + '/api/v1/my/profile/password?token=' + token;
    const reqJsonData = {
      'data' : {
        'type' : 'users',
        'attributes' : {
          'password' : password,
          'password_confirmation' : passwordConf
        }
      }
    };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.patch(updatePasswordURL, reqJsonData, {observe: 'response', headers: headers});
  }

  getmyQuestionnaires() {
    const token = localStorage.getItem('token');
    const myProfileURL = this.globals.apiEndPoint + '/api/v1/my/questionnaires?token=' + token + '&limit=0';
    const headers = new HttpHeaders().set('Accept-Language', this.translate.currentLang);
    return this.http.get(myProfileURL, {observe: 'response', headers: headers});
  }

  getmyStudies() {
    const token = localStorage.getItem('token');
    const myStudiesURL = this.globals.apiEndPoint + '/api/v1/my/studies?token=' + token + '&limit=0';
    const headers = new HttpHeaders().set('Accept-Language', this.translate.currentLang);
    return this.http.get(myStudiesURL, {observe: 'response', headers: headers});
  }
}
