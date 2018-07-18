import { Component, OnInit } from '@angular/core';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import { MyApiService } from '../services/API/my-api.service';
import { TipDetails } from '../models/tipsDetails';


export interface TipsDialog{
    message:number
}

@Component({
    selector: 'app-tips',
    template: `<div class="modal-dialog">
    <div class="modal-content">
       <div class="modal-header">
         <button type="button" class="close" (click)="close()" >&times;</button>
         <h4 class="modal-title">{{message}}</h4>
       </div>
 </div>`
  })

  export class TipsDialogComponent extends DialogComponent<TipsDialog, null> implements TipsDialog, OnInit{
    message:number
    tipsDataDetails: TipDetails
    constructor(
        dialogService: DialogService,
        private myapiService: MyApiService,
    )
    {
        super(dialogService)
    }
    
  ngOnInit() {
    const req = this.myapiService.getTipsDetails(this.message);
    req.subscribe( resp => {
        const  tipsDetails = resp.body['data'];
        //console.log(this.tipsDataDetails)
        this.tipsDataDetails=
          new TipDetails(
              tipsDetails['id'],
              tipsDetails['attributes']['title'],
              tipsDetails['attributes']['text'],
              tipsDetails['attributes']['goal'],
              tipsDetails['attributes']['explanation'],
          )
      
      console.log(this.tipsDataDetails)
    })
}
  }