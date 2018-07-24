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
import { Chart } from 'chart.js';

// window.onload = function() {

//   var btnContainer =  document.getElementById("myIcon")
//   console.log(btnContainer)
  
//   // Get all buttons with class="btn" inside the container
  
  
//   // Loop through the buttons and add the active class to the current/clicked button
  
//     btnContainer.addEventListener("click", function() {
//       console.log("ghhna")
//       var current = document.getElementsByClassName("iconNon");
//       console.log(current)
//       current[0].className = current[0].className.replace("iconNon", "iconActive");
//       this.className += "active";
//     });
  
//   }

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
    weatherDates = []
    //chart=Chart
    chart=false
    title = 'Star Rating';  
    starList: boolean[] = [true,true,true,true,true]; 
    rating:number;  
    rateB:boolean
    starId=0;
    rate:any

  
    
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
      this.chart=false
      this.rateB=false
      
    });
   }

  ngOnInit() {
      this.getAllTips(2)
      // console.log(this.chart)
      // this.chartView()
      // console.log(this.chart)

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
             5,
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
  chartView(){
    this.chart=true;
    new Chart('canvas', {
      type: 'line',
      data: {
        labels: ["lolo","lo"],
        datasets: [
          { 
            data: [39,41,38,35],
            borderColor: "#3cba9f",
            fill: false
          },
          { 
            data: [12,17,18,10],
            borderColor: "#ffcc00",
            fill: false
          },
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
  }
  // public setvalue() {
  //   this.isSyncAnimated = false;
  //   return this.isSyncAnimated
  // }
  // public getValue(){
  //   return this.isSyncAnimated
  // }
  setStar(){
    console.log("d5l hna")
    //this.rateB=true
    this.rating=this.rate+1;  
    //var tableList = this.tipsData.find(function (obj: any) { return obj.Id === record.id });                           
    for(var i=0;i<=4;i++){  
      if(i<=this.rate){  
        this.starList[i]=false;  
      }  
      else{  
        this.starList[i]=true;  
      }  
   }  
}
setRate(id:any,i:any){
  this.rateB=true
  this.starId=id
  this.rate=i
  for (const tipData of this.tipsData) {
    if (tipData.id==id){
      tipData.rate=i;
    }
  }
  console.log(this.rateB)
}  
  }
