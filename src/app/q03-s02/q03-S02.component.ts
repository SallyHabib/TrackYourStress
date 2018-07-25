import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MyApiService } from '../services/API/my-api.service';
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
        private elementRef: ElementRef
      ) {
          this.ngOnInit();
          this.chart=false
          
        }
        
    ngOnInit(){

        this.gettingApiData()
       // this.chartView()
    }
    // chartView(){
    //   console.log(this.values)
    // //    var ctx = document.getElementById("canvas");
    // //    console.log(ctx)
      
    // }
  gettingApiData(){
    const req = this.myapiService.getAnswerQuesstionaire3Question2();
    req.subscribe( resp => {
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
               labels: ["date","value","frfrfrfr","jjj"],
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
    });

    
  }  
}