import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';
import {Globals} from "../../GlobalVars/globals";

@Injectable()
export class StudiesApiService {

  constructor(
    private http: HttpClient,
    private translate: TranslateService,
    private globals: Globals
  ) { }

  getAllStudies(page: number) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Accept-Language', this.translate.currentLang);
    const allStudiesURL = this.globals.apiEndPoint + '/api/v1/studies?token=' + token + '&page=' + page;
    return this.http.get(allStudiesURL, {observe: 'response', headers: headers});
  }

  subscribeToStudy(studyId: number, studyPassword: string) {
    const token = localStorage.getItem('token');
    const subscribeStudyURL = this.globals.apiEndPoint + '/api/v1/studies/' +
      studyId + '/subscribe?token=' + token;
    const reqJsonData = {
      'data' : {
        'type' : 'users',
        'attributes' : {
          'code' : '',
          'password' : studyPassword
        }
      }
    };
    return this.http.post(subscribeStudyURL, reqJsonData, {observe: 'response'});
  }

  unsubscribeFromStudy(studyId: number) {
    const token = localStorage.getItem('token');
    const unsubscribeStudyURL = this.globals.apiEndPoint + '/api/v1/studies/' +
      studyId + '/unsubscribe?token=' + token;
    return this.http.delete(unsubscribeStudyURL, {observe: 'response'});
  }

}
