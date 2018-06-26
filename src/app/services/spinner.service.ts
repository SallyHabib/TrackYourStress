import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SpinnerService {

  private showSpinnerBool = new Subject<boolean>();

  constructor() { }

  getSpinnerBool(): Observable<any> {
    return this.showSpinnerBool.asObservable();
  }

  showSpinner() {
    this.showSpinnerBool.next(true);
  }

  hideSpinner() {
    this.showSpinnerBool.next(false);
  }

}
