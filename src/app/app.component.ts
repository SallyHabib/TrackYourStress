import { Component } from '@angular/core';
import { TranslateService} from '@ngx-translate/core';
import { Globals } from './GlobalVars/globals';
import {environment} from '../environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private translate: TranslateService,
    private globals: Globals
  ) {
    translate.addLangs(['en', 'de']);
    translate.setDefaultLang('en');
    translate.use(translate.getBrowserLang());

    // determine the api-Endpoint
    this.globals.apiEndPoint = environment.apiUrl;

  }

}
