import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../models/user';
import {TranslateService} from '@ngx-translate/core';
import {Globals} from '../../GlobalVars/globals';

@Injectable()
export class UserService {

  constructor(
    private http: HttpClient,
    private translate: TranslateService,
    private globals: Globals
  ) { }

  registerUserToAPI(user: User) {
    const reqJsonData = {
      'data' : {
        'type' : 'users',
        'attributes' : {
          'email' : user.email,
          'password' : user.password,
          'password_confirmation' : user.passwordAgain,
          'name' : user.nickname,
          'settings' : {
            'language' : this.translate.currentLang
          }
        }
      }
    };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post( this.globals.apiEndPoint + '/api/v1/auth/register', reqJsonData,
      {observe: 'response', headers: headers});
  }

  loginUserToAPI(user: User) {
    let reqJsonData = null;

    if (user.email !== '') {
      reqJsonData = {
        'data' : {
          'type' : 'users',
          'attributes' : {
            'email' : user.email,
            'password' : user.password
          }
        }
      };
    } else {
      reqJsonData = {
        'data' : {
          'type' : 'users',
          'attributes' : {
            'name' : user.nickname,
            'password' : user.password
          }
        }
      };
    }
    return this.http.post(this.globals.apiEndPoint + '/api/v1/auth/login', reqJsonData,
      {observe: 'response'});
  }

  verifyTokenToAPI(tokenToVerify: string) {
    const verifyTokenURL = this.globals.apiEndPoint + '/api/v1/auth/verify/token/' + tokenToVerify;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(verifyTokenURL, {observe: 'response', headers: headers});
  }

  requestPWReset(email: string) {
    const resetURL = this.globals.apiEndPoint + '/api/v1/auth/password/reset/instructions';
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const reqJsonData = {
      'data' : {
        'type' : 'users',
        'attributes' : {
          'email' : email
        }
      }
    };
    return this.http.post(resetURL, reqJsonData, {observe: 'response', headers: headers});
  }

  setNewPassword(resetToken: string, password: string, passwordConf: string) {
    const resetURL = this.globals.apiEndPoint + '/api/v1/auth/password/reset';
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const reqJsonData = {
      'data' : {
        'type' : 'users',
        'attributes' : {
          'reset_token' : resetToken,
          'password' : password,
          'password_confirmation' : passwordConf
        }
      }
    };
    return this.http.post(resetURL, reqJsonData, {observe: 'response', headers: headers});
  }

  refreshToken(oldToken: string) {
    const refreshURL = this.globals.apiEndPoint + '/api/v1/auth/refresh?token=' + oldToken;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post( refreshURL, {observe: 'response', headers: headers});
  }

}
