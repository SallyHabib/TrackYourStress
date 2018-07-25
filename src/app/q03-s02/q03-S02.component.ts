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
    values=[]
    chart=false

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
        this.chartView()
    }
    chartView(){
    //    var ctx = document.getElementById("canvas");
    //    console.log(ctx)
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
                data:this.values,
                borderColor: "#3cba9f",
                fill: false
              },
              { 
                data:[12,13,14,15] ,
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
}
    }
  gettingApiData(){
    const req = this.myapiService.getAnswerQuesstionaire3Question2();
    req.subscribe( resp => {
        const answersData = resp.body['data'];
        //console.log(answersData)
        let answersArray=answersData['attributes']['answers'];
        //console.log(answersArray)
        for(const answerData of answersArray){
            //console.log(answerData['label'])
            this.answersQ02.push(
                new answers(
                    answerData['label'],
                    answerData['value']
                )
            )
            this.values.push(answerData['value'])
        }
        console.log(this.values)


    });
  }  
}