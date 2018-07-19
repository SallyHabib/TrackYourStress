import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MyApiService } from '../services/API/my-api.service';
import { SpinnerService } from '../services/spinner.service';
import { Pagination } from '../models/pagination';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Tip } from '../models/tips';
import {ISubscription} from 'rxjs/Subscription';
import {DialogService} from "ng2-bootstrap-modal";
import {TipsDialogComponent} from "./tipsDialog.component"
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tips',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.css'],
  providers:[MyApiService,DialogService]
})
export class TipsComponent implements OnInit {
    data=[]
    tipsData: Tip[] =[]
    pagination: Pagination = new Pagination(0, 0, 0, 0, 0);
    linkDetail="loading...."
    selectedTipId=0
    langChangeSubscription: ISubscription;
    faInfoCircle = faInfoCircle;
    public isSyncAnimated:boolean
  
    
  constructor(
    private myapiService: MyApiService,
    private translate: TranslateService,
    private spinnerService: SpinnerService,
    private router: Router,
    private dialogService: DialogService,
  ) {
     this.langChangeSubscription = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.ngOnInit();
      this.isSyncAnimated=false
    });
   }

  ngOnInit() {
      this.getAllTips(2)

}
  getAllTips(pageNumber: number){
    const req = this.myapiService.getTips(pageNumber);
    req.subscribe( resp => {
      

      if(this.tipsData.length!== 0){
          this.tipsData=[]
      }
      const tipsData = resp.body['data'];
     
      for (const tipData of tipsData) {
       let linkDetail= "https://"+tipData['links']['self']
        this.tipsData.push(
         new Tip(
             tipData['id'],
             tipData['attributes']['title'],
             tipData['attributes']['name'],
             tipData['attributes']['goal'],
             linkDetail,
         )
        );
      }
      console.log(this.tipsData[0].name)
      const paginationHttp = resp['body']['meta']['pagination'];
      this.pagination = new Pagination(
        paginationHttp['total'],
        paginationHttp['count'],
        paginationHttp['per_page'],
        paginationHttp['current_page'],
        paginationHttp['total_pages']
      );
    
    }, err => {
      const status = err['status'];
      console.log('error')
    });
  }
  changePage(direction: number) {
    if (direction === 0) {
      this.spinnerService.showSpinner();
      this.tipsData = [];
      this.getAllTips(this.pagination.current_page - 1);
    } else if (direction === 1) {
      this.spinnerService.showSpinner();
      this.tipsData = [];
      this.getAllTips(this.pagination.current_page + 1);
    }
  }
  getTipDetails(id:number){
    //console.log(Error)
   //this.router.navigate(['/tipsDetails'+"/"+tip]);
  //   const req = this.myapiService.getTipsDetails(tip);
  //   req.subscribe( resp => {
  //     const tipsDetails = resp.body['data'];
  //     console.log(tipsDetails)
  //   }
  // );
  console.log(id)
    this.isSyncAnimated=true
    this.dialogService.addDialog(TipsDialogComponent,{message:id});
    // console.log(this.isSyncAnimated)
  }
  // public setvalue() {
  //   this.isSyncAnimated = false;
  //   return this.isSyncAnimated
  // }
  // public getValue(){
  //   return this.isSyncAnimated
  // }

  }
