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
    answersQ03:answers[]=[]
    answersQ04:answers[]=[]
    answersQ06:answers[]=[]
    dailyLabels:number[]=[]
    labels1:string[]=[]
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
        this.gettingApiData4()
        this.gettingApiData5()
        this.gettingApiData6()
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
        let label1=[]
        //console.log(temp_max)
        //console.log(answersData)
          let c1=0;
       

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
            let c2=c1+1
            label1.push("day"+c2)
            c1++;
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
               labels: label1,
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
        let label2=[]
        let c1=0;
        //console.log(temp_max)
        //console.log(answersData)
        let answersArray=answersData['attributes']['answers'];
       // console.log(answersArray.length)
        for(const answerData of answersArray){
            //console.log(answerData['label'])
            this.answersQ03.push(
                new answers(
                    answerData['label'],
                    answerData['value']
                )
            )
            let c2=c1+1
            label2.push("day"+c2)
            c1++;
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
               labels: label2,
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
        let label3=[]
        let c1=0;
        //console.log(temp_max)
        //console.log(answersData)
        let answersArray=answersData['attributes']['answers'];
       // console.log(answersArray.length)
        for(const answerData of answersArray){
            //console.log(answerData['label'])
            this.answersQ04.push(
                new answers(
                    answerData['label'],
                    answerData['value']
                )
            )
            let c2=c1+1
            label3.push("day"+c2)
            c1++;
        }
        
        console.log(temp_max3.length+"3")
    
        let ctx3 = document.getElementById("canvas3")
        
           console.log(ctx3+"3")
        if(ctx3){
        if(ctx3 instanceof HTMLCanvasElement){
            console.log("Dd3")
         // var myC=new Chart(ctx,{});
           var myChart= new Chart(ctx3, {
             type: 'line',
             data: {
               labels: label3,
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
  gettingApiData4(){
    console.log("gh hna4")
    const req = this.myapiService.getAnswerQuesstionaire3Question6();
    req.subscribe( resp => {
        const httpStatus = resp['status'];
        console.log(httpStatus)
        const answersData = resp.body['data'];
        let temp_max4 = resp.body['data']['attributes']['answers'].map(resp => resp.value);
        let label4=[]
        let c1=0;
        //console.log(temp_max)
        //console.log(answersData)
        let answersArray=answersData['attributes']['answers'];
       // console.log(answersArray.length)
        for(const answerData of answersArray){
            //console.log(answerData['label'])
            this.answersQ06.push(
                new answers(
                    answerData['label'],
                    answerData['value']
                )
            )
            let c2=c1+1
            label4.push("day"+c2)
            c1++;
        }
        
        console.log(temp_max4.length+"4")
    
        let ctx4 = document.getElementById("canvas4")
        
           console.log(ctx4+"4")
        if(ctx4){
        if(ctx4 instanceof HTMLCanvasElement){
            console.log("Dd4")
         // var myC=new Chart(ctx,{});
           var myChart= new Chart(ctx4, {
             type: 'line',
             data: {
               labels: label4,
               datasets: [
                 { 
                   data:temp_max4,
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
            this.gettingApiData4()
          }
        });
      }
    });
    

  }
  gettingApiData5(){
    console.log("gh hna5")
    const req = this.myapiService.getAnswerQuesstionaire3Question7();
    req.subscribe( resp => {
        const httpStatus = resp['status'];
        console.log(httpStatus)
        const answersData = resp.body['data'];
        let temp_max5 = resp.body['data']['attributes']['answers'].map(resp => resp.value);
        let label5=[]
        let c1=0
        //console.log(temp_max)
        //console.log(answersData)
        let answersArray=answersData['attributes']['answers'];
       // console.log(answersArray.length)
        for(const answerData of answersArray){
            //console.log(answerData['label'])
            this.answersQ06.push(
                new answers(
                    answerData['label'],
                    answerData['value']
                )
            )
            let c2=c1+1
            label5.push("day"+c2)
            c1++;
        }
        
        console.log(temp_max5.length+"5")
    
        let ctx5 = document.getElementById("canvas5")
        
           console.log(ctx5+"5")
        if(ctx5){
        if(ctx5 instanceof HTMLCanvasElement){
            console.log("Dd5")
         // var myC=new Chart(ctx,{});
           var myChart= new Chart(ctx5, {
             type: 'line',
             data: {
               labels: label5,
               datasets: [
                 { 
                   data:temp_max5,
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
            this.gettingApiData5()
          }
        });
      }
    });
    

  }
  gettingApiData6(){
    console.log("gh hna6")
    const req = this.myapiService.getAnswerQuesstionaire3Question5();
    req.subscribe( resp => {
        const httpStatus = resp['status'];
        console.log(httpStatus)
        const answersData = resp.body['data'];
        let temp_max6 = resp.body['data']['attributes']['answers'].map(resp => resp.value);
        let label6=[]
        let c1=0;
        //console.log(temp_max)
        //console.log(answersData)
        let answersArray=answersData['attributes']['answers'];
       // console.log(answersArray.length)
        for(const answerData of answersArray){
            //console.log(answerData['label'])
            this.answersQ06.push(
                new answers(
                    answerData['label'],
                    answerData['value']
                )
            )
            let c2=c1+1
            label6.push("day"+c2)
            c1++;
        }
        
        console.log(temp_max6.length+"6")
    
        let ctx6 = document.getElementById("canvas6")
        
           console.log(ctx6+"6")
        if(ctx6){
        if(ctx6 instanceof HTMLCanvasElement){
            console.log("Dd6")
         // var myC=new Chart(ctx,{});
           var myChart= new Chart(ctx6, {
             type: 'line',
             data: {
               labels: label6,
               datasets: [
                 { 
                   data:temp_max6,
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
            this.gettingApiData6()
          }
        });
      }
    });
  }
}