import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NavbarService {

  private isLoggedIn = new Subject<boolean>();

  constructor() {
  }


  getIsLoggedIn(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }


  loginUser(isLoggedIn: boolean) {
    this.isLoggedIn.next(isLoggedIn);
  }

}
