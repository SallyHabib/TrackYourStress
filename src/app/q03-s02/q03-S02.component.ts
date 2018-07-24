import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MyApiService } from '../services/API/my-api.service';



@Component({
  selector: 'app-q03-s02',
  templateUrl: './q03-s02.component.html',
  styleUrls: ['./q03-s02.component.css']
})
export class q03S02 implements OnInit {

    constructor(
        private myapiService: MyApiService,
        private router: Router,
      ) {
          this.ngOnInit();
          
        }
        
    ngOnInit(){
        // const req = this.myapiService.getAnswerQuesstionaire3Question2();
        // req.subscribe( resp => {
        //     const answersData = resp.body['data'];
        //     console.log(answersData)
        // });
    }
    
}