import { Injectable } from '@angular/core';
import {UserService} from './user.service';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {Router} from '@angular/router';
import {NavbarService} from '../navbar.service';

@Injectable()
export class TokenrefresherService {

  constructor(
    private userService: UserService,
    private router: Router,
    private navbarService: NavbarService
  ) { }

  // refreshes the token
  /*/
    returns http 200 on success
   */
  refreshToken(): Observable<Number> {
    const httpStatus = new Subject<Number>();
    const oldToken = localStorage.getItem('token');
    const req = this.userService.refreshToken(oldToken);
    req.subscribe(resp => {
      const newToken = resp['data']['attributes']['token'];
      localStorage.setItem('token', newToken);
      httpStatus.next(200);
    }, err => {
      // force the user to a new login
      localStorage.removeItem('token');
      this.navbarService.loginUser(false);
      this.router.navigate(['/home']);
    });
    return httpStatus.asObservable();
  }

}
