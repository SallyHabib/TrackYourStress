import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MyApiService } from '../services/API/my-api.service';
import {TranslateService} from '@ngx-translate/core';
import { Pagination } from '../models/pagination';
import { Tip } from '../models/tips';

@Component({
  selector: 'app-tips',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.css']
})
export class TipsComponent implements OnInit {
    data=[]
    tipsData: Tip[] =[]
    tipDataAtrr='zozo'
  constructor(
    private myapiService: MyApiService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    const req = this.myapiService.getTips();
    req.subscribe( resp => {
      const tipsDataResp = resp.body['data'];
      //console.log(tipsDataResp)

      if(this.tipsData.length!== 0){
          this.tipsData=[]
      }
      const tipsData = resp.body['data'];
     
      for (const tipData of tipsData) {
      
        this.tipsData.push(
         new Tip(
             tipData['id'],
             tipData['attributes']['title'],
             tipData['attributes']['name'],
             tipData['attributes']['goal'],
             tipData['links']['self'],
         )
        );
      }
      console.log(this.tipsData)
    
    }, err => {
      const status = err['status'];
      console.log('error')
    });
  }

}
