import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MyApiService } from '../services/API/my-api.service';
import { TipDetails } from '../models/tipsDetails';

@Component({
  selector: 'app-tips-details',
  templateUrl: './tips-details.component.html',
  styleUrls: ['./tips-details.component.css']
})
export class TipsDetailsComponent implements OnInit {
  tipsDataDetails: TipDetails
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private myapiService: MyApiService,
  ) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    console.log(id)
    let idNum=Number(id)
    const req=this.myapiService.getTipsDetails(idNum)
    req.subscribe( resp => {
      const tipsDetails = resp.body['data'];
      //console.log(tipsDetails)
     
        this.tipsDataDetails=
          new TipDetails(
              tipsDetails['id'],
              tipsDetails['attributes']['title'],
              tipsDetails['attributes']['text'],
              tipsDetails['attributes']['goal'],
              tipsDetails['attributes']['explanation'],
          )
      
      console.log(this.tipsDataDetails)
    }
    )
  }

}
