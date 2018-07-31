import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MyApiService } from '../services/API/my-api.service';
import {TokenrefresherService} from '../services/API/tokenrefresher.service';
import { answers }  from '../models/Answers';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-q03-s02',
  templateUrl: './q03-s02.component.html',
  styleUrls: ['./q03-s02.component.css']
})
export class q03S02 implements OnInit {
    answersQ02:answers[]=[]
    chart=false
    //temp_max:number[]=[]
    constructor(
        private myapiService: MyApiService,
        private router: Router,
        private elementRef: ElementRef,
        private tokenrefresher: TokenrefresherService,
      ) {
          this.ngOnInit();
          this.chart=false
          
        }
        
    ngOnInit(){

        this.gettingApiData1()
        this.gettingApiData2()
        this.gettingApiData3()
       // this.chartView()
    }
    // chartView(){
    //   console.log(this.values)
    // //    var ctx = document.getElementById("canvas");
    // //    console.log(ctx)
      
    // }
  gettingApiData1(){
    const req = this.myapiService.getAnswerQuesstionaire3Question2();
    req.subscribe( resp => {
        const httpStatus = resp['status'];
        console.log(httpStatus)
        const answersData = resp.body['data'];
        let temp_max = resp.body['data']['attributes']['answers'].map(resp => resp.value);
        //console.log(temp_max)
        //console.log(answersData)
        let answersArray=answersData['attributes']['answers'];
       // console.log(answersArray.length)
        for(const answerData of answersArray){
            //console.log(answerData['label'])
            this.answersQ02.push(
                new answers(
                    answerData['label'],
                    answerData['value']
                )
            )
        }
        
        console.log(temp_max.length)

    
        let ctx = this.elementRef.nativeElement.querySelector(`canvas`);
           
        if(ctx){
        if(ctx instanceof HTMLCanvasElement){
            console.log("D")
         // var myC=new Chart(ctx,{});
           var myChart= new Chart(ctx, {
             type: 'line',
             data: {
               labels: ["date","value","frfrfrfr","jjj","a","l","m","b","p","g","aa","o","lo","final"],
               datasets: [
                 { 
                   data:temp_max,
                   borderColor: "#3cba9f",
                   fill: false
                 }
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
    }
    }, err => {
      const status = err['status'];
      if (status === 401) {
        console.log("refresh token")
        // token is expired
        this.tokenrefresher.refreshToken().subscribe(httpStatus => {
          if (httpStatus === 200) {
            this.gettingApiData1()
          }
        });
      }
    });
    

    
  }

  gettingApiData2(){
    console.log("gh hna2")
    const req = this.myapiService.getAnswerQuesstionaire3Question3();
    req.subscribe( resp => {
        const httpStatus = resp['status'];
        console.log(httpStatus)
        const answersData = resp.body['data'];
        let temp_max2 = resp.body['data']['attributes']['answers'].map(resp => resp.value);
        //console.log(temp_max)
        //console.log(answersData)
        let answersArray=answersData['attributes']['answers'];
       // console.log(answersArray.length)
        for(const answerData of answersArray){
            //console.log(answerData['label'])
            this.answersQ02.push(
                new answers(
                    answerData['label'],
                    answerData['value']
                )
            )
        }
        
        console.log(temp_max2.length+"2")
    
        let ctx2 = document.getElementById("canvas2")
        
           console.log(ctx2+"2")
        if(ctx2){
        if(ctx2 instanceof HTMLCanvasElement){
            console.log("Dd")
         // var myC=new Chart(ctx,{});
           var myChart= new Chart(ctx2, {
             type: 'line',
             data: {
               labels: ["a","b","c","d","e","f","g","h","i","k","l"],
               datasets: [
                 { 
                   data:temp_max2,
                   borderColor: "#3cba9f",
                   fill: false
                 }
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
    }
    }, err => {
      const status = err['status'];
      if (status === 401) {
        console.log("refresh token")
        // token is expired
        this.tokenrefresher.refreshToken().subscribe(httpStatus => {
          if (httpStatus === 200) {
            this.gettingApiData2()
          }
        });
      }
    });
    

    
  }

  gettingApiData3(){
    console.log("gh hna3")
    const req = this.myapiService.getAnswerQuesstionaire3Question4();
    req.subscribe( resp => {
        const httpStatus = resp['status'];
        console.log(httpStatus)
        const answersData = resp.body['data'];
        let temp_max3 = resp.body['data']['attributes']['answers'].map(resp => resp.value);
        //console.log(temp_max)
        //console.log(answersData)
        let answersArray=answersData['attributes']['answers'];
       // console.log(answersArray.length)
        for(const answerData of answersArray){
            //console.log(answerData['label'])
            this.answersQ02.push(
                new answers(
                    answerData['label'],
                    answerData['value']
                )
            )
        }
        
        console.log(temp_max3.length+"3")
    
        let ctx3 = document.getElementById("canvas3")
        
           console.log(ctx3+"3")
        if(ctx3){
        if(ctx3 instanceof HTMLCanvasElement){
            console.log("Dd")
         // var myC=new Chart(ctx,{});
           var myChart= new Chart(ctx3, {
             type: 'line',
             data: {
               labels: ["a","b","c","d","e","f","g","h","i","k","l"],
               datasets: [
                 { 
                   data:temp_max3,
                   borderColor: "#3cba9f",
                   fill: false
                 }
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
    }
    }, err => {
      const status = err['status'];
      if (status === 401) {
        console.log("refresh token")
        // token is expired
        this.tokenrefresher.refreshToken().subscribe(httpStatus => {
          if (httpStatus === 200) {
            this.gettingApiData3()
          }
        });
      }
    });
    

  }
  
}