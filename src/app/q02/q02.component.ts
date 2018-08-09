import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MyApiService } from '../services/API/my-api.service';
import {TokenrefresherService} from '../services/API/tokenrefresher.service';
import { answers }  from '../models/Answers';
import { Chart } from 'chart.js';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {ISubscription} from 'rxjs/Subscription';


@Component({
  selector: 'app-q02',
  templateUrl: './q02.component.html',
  styleUrls: ['./q02.component.css']
})
export class q02Component implements OnInit {

    constructor(
        private myapiService: MyApiService,
        private router: Router,
        private elementRef: ElementRef,
        private tokenrefresher: TokenrefresherService,
        private translate: TranslateService
      ) {
          this.ngOnInit();
          
        }
        
    ngOnInit(){
        this.gettingApiData1();
        this.gettingApiData2();
        this.gettingApiData3();
        this.gettingApiData4();
        this.gettingApiData5();
       this.gettingApiData6();
       this.gettingApiData7();
       this.gettingApiData8();
       this.gettingApiData9();
       this.gettingApiData10();
    }

    gettingApiData1(){
        const req = this.myapiService.getAnswerQuesstionaire3QuestionWeekly01();
        req.subscribe( resp => {
            const httpStatus = resp['status'];
            console.log(httpStatus)
            const answersData = resp.body['data'];
            let temp_max = resp.body['data']['attributes']['answers'].map(resp => resp.value);
            temp_max.reverse()
            let label1=[]
            //console.log(temp_max)
            //console.log(answersData)
              let c1=0;
           
    
            let answersArray=answersData['attributes']['answers'];
           // console.log(answersArray.length)
            for(const answerData of answersArray){
                //console.log(answerData['label'])
                // this.answersQ02.push(
                //     new answers(
                //         answerData['label'],
                //         answerData['value']
                //     )
                // )
                let c2=c1+1
                label1.push("week"+c2)
                c1++;
            }
            
            console.log(temp_max.length)
    
        
            let ctx = this.elementRef.nativeElement.querySelector("canvas");
            console.log(ctx)
            
            if(ctx){
            if(ctx instanceof HTMLCanvasElement){
              
           
                console.log("DD1")
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
                this.ngOnInit()
              }
            });
          }
        });
        
    
      
        
      }

      gettingApiData2(){
        const req = this.myapiService.getAnswerQuesstionaire3QuestionWeekly02();
        req.subscribe( resp => {
            const httpStatus = resp['status'];
            console.log(httpStatus)
            const answersData = resp.body['data'];
            let temp_max2 = resp.body['data']['attributes']['answers'].map(resp => resp.value);
            temp_max2.reverse()
            let label2=[]
            //console.log(temp_max)
            //console.log(answersData)
              let c1=0;
           
    
            let answersArray=answersData['attributes']['answers'];
           // console.log(answersArray.length)
            for(const answerData of answersArray){
                //console.log(answerData['label'])
                // this.answersQ02.push(
                //     new answers(
                //         answerData['label'],
                //         answerData['value']
                //     )
                // )
                let c2=c1+1
                label2.push("week"+c2)
                c1++;
            }
            
            console.log(temp_max2.length)
    
            let ctx2 = document.getElementById("canvas2")!;
            console.log(ctx2)
            
            if(ctx2){
            if(ctx2 instanceof HTMLCanvasElement){
              
           
                console.log("DD1")
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
                this.ngOnInit()
              }
            });
          }
        });
        
    
      }

    gettingApiData3(){
        const req = this.myapiService.getAnswerQuesstionaire3QuestionWeekly03();
        req.subscribe( resp => {
            const httpStatus = resp['status'];
            console.log(httpStatus)
            const answersData = resp.body['data'];
            let temp_max3 = resp.body['data']['attributes']['answers'].map(resp => resp.value);
            temp_max3.reverse()
            let label3=[]
            //console.log(temp_max)
            //console.log(answersData)
              let c1=0;
           
    
            let answersArray=answersData['attributes']['answers'];
           // console.log(answersArray.length)
            for(const answerData of answersArray){
                //console.log(answerData['label'])
                // this.answersQ02.push(
                //     new answers(
                //         answerData['label'],
                //         answerData['value']
                //     )
                // )
                let c2=c1+1
                label3.push("week"+c2)
                c1++;
            }
            
            console.log(temp_max3.length)
           
            let ctx3 = document.getElementById("canvas3")!;
            console.log(ctx3+"3")
            
            if(ctx3){
            if(ctx3 instanceof HTMLCanvasElement){
              
           
                console.log("DD3")
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
                this.ngOnInit()
              }
            });
          }
        });
        
    
    }
    gettingApiData4(){
        const req = this.myapiService.getAnswerQuesstionaire3QuestionWeekly04();
        req.subscribe( resp => {
            const httpStatus = resp['status'];
            console.log(httpStatus)
            const answersData = resp.body['data'];
            let temp_max4 = resp.body['data']['attributes']['answers'].map(resp => resp.value);
            temp_max4.reverse()
            let label4=[]
            //console.log(temp_max)
            //console.log(answersData)
              let c1=0;
           
    
            let answersArray=answersData['attributes']['answers'];
           // console.log(answersArray.length)
            for(const answerData of answersArray){
                //console.log(answerData['label'])
                // this.answersQ02.push(
                //     new answers(
                //         answerData['label'],
                //         answerData['value']
                //     )
                // )
                let c2=c1+1
                label4.push("week"+c2)
                c1++;
            }
            
            console.log(temp_max4.length)
           
            let ctx4 = document.getElementById("canvas4")!;
            //console.log(ctx4)
            
            if(ctx4){
            if(ctx4 instanceof HTMLCanvasElement){
              
           
                console.log("DD3")
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
                this.ngOnInit()
              }
            });
          }
        });
    }

    gettingApiData5(){
        const req = this.myapiService.getAnswerQuesstionaire3QuestionWeekly06();
        req.subscribe( resp => {
            const httpStatus = resp['status'];
            console.log(httpStatus)
            const answersData = resp.body['data'];
            let temp_max5 = resp.body['data']['attributes']['answers'].map(resp => resp.value);
            temp_max5.reverse()
            let label5=[]
            //console.log(temp_max)
            //console.log(answersData)
              let c1=0;
           
    
            let answersArray=answersData['attributes']['answers'];
           // console.log(answersArray.length)
            for(const answerData of answersArray){
                //console.log(answerData['label'])
                // this.answersQ02.push(
                //     new answers(
                //         answerData['label'],
                //         answerData['value']
                //     )
                // )
                let c2=c1+1
                label5.push("week"+c2)
                c1++;
            }
            
            console.log(temp_max5.length)
           
            let ctx5 = document.getElementById("canvas5")!;
            //console.log(ctx4)
            
            if(ctx5){
            if(ctx5 instanceof HTMLCanvasElement){
              
           
                console.log("DD3")
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
                this.ngOnInit()
              }
            });
          }
        });
    }
      
    gettingApiData6(){
        console.log("gh hna6")
    const req = this.myapiService.getAnswerQuesstionaire3QuestionWeekly05();
    req.subscribe( resp => {
        const httpStatus = resp['status'];
        console.log(httpStatus)
        const answersData = resp.body['data'];
        //let temp_max7 = resp.body['data']['attributes']['answers'].map(resp => resp.value);
        let NOSTRESS=[]
        let privateV=[]
        let proffesional=[]
        let others=[]
        //temp_max7.reverse()
        // let label7=[]
        // let c1=0;
        //console.log(temp_max)
        //console.log(answersData)
        let answersArray=answersData['attributes']['answers'];
        //answersArray.reverse();
       // console.log(answersArray.length)
        for(const answerData of answersArray){
            //console.log(answerData['label'])
            // this.answersQ06.push(
            //     new answers(
            //         answerData['label'],
            //         answerData['value']
            //     )
            // )
            if(answerData['value'][0]=="NOSTRESS"){
                NOSTRESS.push(1)
            }else{
              if(answerData['value'][0]=="OTHERS"){
                others.push(1)
              }
              else{
                if(answerData['value'][0]=="PRIVATE"){
                  privateV.push(1)
                }else{
                  proffesional.push(1)
                }

              }
            }
            // let c2=c1+1
            // label6.push("day"+c2)
            // c1++;
        }
        
        //console.log(temp_max7.length+"7")
    
        let ctx6 = document.getElementById("canvas6")
        
           console.log(ctx6+"7")
        if(ctx6){
        if(ctx6 instanceof HTMLCanvasElement){
            console.log("Dd7")
         // var myC=new Chart(ctx,{});
           var myChart= new Chart(ctx6, {
             type: 'line',
             data: {
               labels: ["others","proffesional","private","NOSTRESS"],
               datasets: [
                 { 
                   data:[others.length,proffesional.length,privateV.length,NOSTRESS.length],
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
            this.ngOnInit()
          }
        });
      }
    });
    }
    
    gettingApiData7(){
        console.log("gh hna7")
        const req = this.myapiService.getAnswerQuesstionaire3QuestionWeekly07();
        req.subscribe( resp => {
            const httpStatus = resp['status'];
            console.log(httpStatus)
            const answersData = resp.body['data'];
            //let temp_max7 = resp.body['data']['attributes']['answers'].map(resp => resp.value);
            let One=[]
            let two=[]
            let three=[]
            let four=[]
            let five=[]
            //temp_max7.reverse()
            // let label7=[]
            // let c1=0;
            //console.log(temp_max)
            //console.log(answersData)
            let answersArray=answersData['attributes']['answers'];
            //answersArray.reverse();
           // console.log(answersArray.length)
            for(const answerData of answersArray){
                //console.log(answerData['label'])
                // this.answersQ06.push(
                //     new answers(
                //         answerData['label'],
                //         answerData['value']
                //     )
                // )
                if(answerData['value']=="ONE"){
                    One.push(1)
                }else{
                  if(answerData['value']=="TWO"){
                    two.push(1)
                  }
                  else{
                    if(answerData['value']=="THREE"){
                      three.push(1)
                    }else{
                        if(answerData['value']=="FOUR"){
                      four.push(1)
                        }
                        else{
                            five.push(1)
                        }
                    }
    
                  }
                }
                // let c2=c1+1
                // label6.push("day"+c2)
                // c1++;
            }
            
            //console.log(temp_max7.length+"7")
        
            let ctx7 = document.getElementById("canvas7")
            
               console.log(ctx7+"7")
            if(ctx7){
            if(ctx7 instanceof HTMLCanvasElement){
                console.log("Dd7")
             // var myC=new Chart(ctx,{});
               var myChart= new Chart(ctx7, {
                 type: 'line',
                 data: {
                   labels: ["one","two","three","four","five"],
                   datasets: [
                     { 
                       data:[One.length,two.length,three.length,four.length,five.length],
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
                this.ngOnInit()
              }
            });
          }
        });
    }

    gettingApiData8(){
        console.log("gh hna8")
        const req = this.myapiService.getAnswerQuesstionaire3QuestionWeekly08();
        req.subscribe( resp => {
            const httpStatus = resp['status'];
            console.log(httpStatus)
            const answersData = resp.body['data'];
            //let temp_max7 = resp.body['data']['attributes']['answers'].map(resp => resp.value);
            let One=[]
            let two=[]
            let three=[]
            let four=[]
            let five=[]
            //temp_max7.reverse()
            // let label7=[]
            // let c1=0;
            //console.log(temp_max)
            //console.log(answersData)
            let answersArray=answersData['attributes']['answers'];
            //answersArray.reverse();
           // console.log(answersArray.length)
            for(const answerData of answersArray){
                //console.log(answerData['label'])
                // this.answersQ06.push(
                //     new answers(
                //         answerData['label'],
                //         answerData['value']
                //     )
                // )
                if(answerData['value']=="ONE"){
                    One.push(1)
                }else{
                  if(answerData['value']=="TWO"){
                    two.push(1)
                  }
                  else{
                    if(answerData['value']=="THREE"){
                      three.push(1)
                    }else{
                        if(answerData['value']=="FOUR"){
                      four.push(1)
                        }
                        else{
                            five.push(1)
                        }
                    }
    
                  }
                }
                // let c2=c1+1
                // label6.push("day"+c2)
                // c1++;
            }
            
            //console.log(temp_max7.length+"7")
        
            let ctx8 = document.getElementById("canvas8")
            
               console.log(ctx8+"8")
            if(ctx8){
            if(ctx8 instanceof HTMLCanvasElement){
                console.log("Dd8")
             // var myC=new Chart(ctx,{});
               var myChart= new Chart(ctx8, {
                 type: 'line',
                 data: {
                   labels: ["one","two","three","four","five"],
                   datasets: [
                     { 
                       data:[One.length,two.length,three.length,four.length,five.length],
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
                this.ngOnInit()
              }
            });
          }
        });
    }

    gettingApiData9(){
        console.log("gh hna9")
        const req = this.myapiService.getAnswerQuesstionaire3QuestionWeekly09();
        req.subscribe( resp => {
            const httpStatus = resp['status'];
            console.log(httpStatus)
            const answersData = resp.body['data'];
            //let temp_max7 = resp.body['data']['attributes']['answers'].map(resp => resp.value);
            let One=[]
            let two=[]
            let three=[]
            let four=[]
            let five=[]
            //temp_max7.reverse()
            // let label7=[]
            // let c1=0;
            //console.log(temp_max)
            //console.log(answersData)
            let answersArray=answersData['attributes']['answers'];
            //answersArray.reverse();
           // console.log(answersArray.length)
            for(const answerData of answersArray){
                //console.log(answerData['label'])
                // this.answersQ06.push(
                //     new answers(
                //         answerData['label'],
                //         answerData['value']
                //     )
                // )
                if(answerData['value']=="ONE"){
                    One.push(1)
                }else{
                  if(answerData['value']=="TWO"){
                    two.push(1)
                  }
                  else{
                    if(answerData['value']=="THREE"){
                      three.push(1)
                    }else{
                        if(answerData['value']=="FOUR"){
                      four.push(1)
                        }
                        else{
                            five.push(1)
                        }
                    }
    
                  }
                }
                // let c2=c1+1
                // label6.push("day"+c2)
                // c1++;
            }
            
            //console.log(temp_max7.length+"7")
        
            let ctx9 = document.getElementById("canvas9")
            
               console.log(ctx9+"9")
            if(ctx9){
            if(ctx9 instanceof HTMLCanvasElement){
                console.log("Dd9")
             // var myC=new Chart(ctx,{});
               var myChart= new Chart(ctx9, {
                 type: 'line',
                 data: {
                   labels: ["one","two","three","four","five"],
                   datasets: [
                     { 
                       data:[One.length,two.length,three.length,four.length,five.length],
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
                this.ngOnInit()
              }
            });
          }
        });
    }

    gettingApiData10(){
        console.log("gh hna7")
        const req = this.myapiService.getAnswerQuesstionaire3QuestionWeekly10();
        req.subscribe( resp => {
            const httpStatus = resp['status'];
            console.log(httpStatus)
            const answersData = resp.body['data'];
            //let temp_max7 = resp.body['data']['attributes']['answers'].map(resp => resp.value);
            let One=[]
            let two=[]
            let three=[]
            let four=[]
            let five=[]
            //temp_max7.reverse()
            // let label7=[]
            // let c1=0;
            //console.log(temp_max)
            //console.log(answersData)
            let answersArray=answersData['attributes']['answers'];
            //answersArray.reverse();
           // console.log(answersArray.length)
            for(const answerData of answersArray){
                //console.log(answerData['label'])
                // this.answersQ06.push(
                //     new answers(
                //         answerData['label'],
                //         answerData['value']
                //     )
                // )
                if(answerData['value']=="ONE"){
                    One.push(1)
                }else{
                  if(answerData['value']=="TWO"){
                    two.push(1)
                  }
                  else{
                    if(answerData['value']=="THREE"){
                      three.push(1)
                    }else{
                        if(answerData['value']=="FOUR"){
                      four.push(1)
                        }
                        else{
                            five.push(1)
                        }
                    }
    
                  }
                }
                // let c2=c1+1
                // label6.push("day"+c2)
                // c1++;
            }
            
            //console.log(temp_max7.length+"7")
        
            let ctx10 = document.getElementById("canvas10")
            
               console.log(ctx10+"10")
            if(ctx10){
            if(ctx10 instanceof HTMLCanvasElement){
                console.log("Dd7")
             // var myC=new Chart(ctx,{});
               var myChart= new Chart(ctx10, {
                 type: 'line',
                 data: {
                   labels: ["one","two","three","four","five"],
                   datasets: [
                     { 
                       data:[One.length,two.length,three.length,four.length,five.length],
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
                this.ngOnInit()
              }
            });
          }
        });
    }
}
