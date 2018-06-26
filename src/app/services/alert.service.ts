import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AlertService {
  private alertMessage = new Subject<any>();
  private keepAfterNavigationChange = false;

  getAlert(): Observable<any> {
    return this.alertMessage.asObservable();
  }

  enterMessage(newmess: string, notificationType: number) {
    let notificationClass = '';

    switch (notificationType) {
      case 0:
        notificationClass = 'alert alert-success alert-dismissible';
        break;
      case 1:
        notificationClass = 'alert alert-danger alert-dismissible';
        break;
      default:
        notificationClass = 'alert alert-danger alert-dismissible';
    }

    this.alertMessage.next({message: newmess, notificationType: notificationClass});
    this.keepAfterNavigationChange = true;
  }

  constructor(private router: Router) {
    // clear alert message on route change
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
          // only keep for a single location change
          this.keepAfterNavigationChange = false;
        } else {
          // clear alert
          this.alertMessage.next();
        }
      }
    });
  }
}
