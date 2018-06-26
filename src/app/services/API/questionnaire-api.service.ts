import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';
import {Globals} from '../../GlobalVars/globals';

@Injectable()
export class QuestionnaireApiService {

  constructor(
    private http: HttpClient,
    private translate: TranslateService,
    private globals: Globals
  ) { }

  getQuestionnaireStructure(questionnaireId: number) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Accept-Language', this.translate.currentLang);
    const questionnaireStructureURL = this.globals.apiEndPoint + '/api/v1/questionnaires/' +
      questionnaireId + '/structure?token=' + token;
    return this.http.get(questionnaireStructureURL, {observe: 'response', headers: headers});
  }

  postAnswersheet(questionnaireId: number, answers, clientInfo) {
    const token = localStorage.getItem('token');
    const currentLan = this.translate.currentLang;
    const submitAnswerURL = this.globals.apiEndPoint + '/api/v1/questionnaires/' + questionnaireId
     + '/answersheets?token=' + token;

    const reqJsonData = {
      'data' : {
        'type' : 'answersheets',
        'attributes' : {
          'collected_at' : Math.floor(Date.now() / 1000), // Date.now(), php
          'locale' : currentLan,
          'answers' : answers,
          'client' : clientInfo
        }
      }
    };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(submitAnswerURL, JSON.stringify(reqJsonData), {observe: 'response', headers: headers});
  }


}
