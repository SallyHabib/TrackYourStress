import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MyApiService } from '../services/API/my-api.service';
import {TokenrefresherService} from '../services/API/tokenrefresher.service';
import { answers }  from '../models/Answers';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-q02',
  templateUrl: './q02.component.html',
  styleUrls: ['./q02.component.css']
})
export class q02Component implements OnInit {

    constructor(
        private myapiService: MyApiService,
        private router: Router,
        private elementRef: ElementRef,
        private tokenrefresher: TokenrefresherService,
      ) {
          this.ngOnInit();
          
        }
        
    ngOnInit(){

    }
}