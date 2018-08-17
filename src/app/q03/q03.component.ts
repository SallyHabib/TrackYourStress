import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MyApiService } from '../services/API/my-api.service';
import {TokenrefresherService} from '../services/API/tokenrefresher.service';
import { answers }  from '../models/Answers';
import { Chart } from 'chart.js';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {ISubscription} from 'rxjs/Subscription';
import { AlertService } from '../services/alert.service';



@Component({
  selector: 'app-q03',
  templateUrl: './q03.component.html',
  styleUrls: ['./q03.component.css']
})
export class q03Component implements OnInit { 
    
    constructor(
        private myapiService: MyApiService,
        private router: Router,
        private elementRef: ElementRef,
        private tokenrefresher: TokenrefresherService,
        private translate: TranslateService,
        private alertService: AlertService,

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
            console.log("gh hna")
            const req = this.myapiService.getAnswerQuesstionaire3Questionmonthly1();
            req.subscribe( resp => {
                const httpStatus = resp['status'];
                console.log(httpStatus)
                // if(httpStatus == 200){
               
                //     this.alertService.enterMessage("ya rabbbb", 0);
                  
                //   this.router.navigate(['/member/mystudies']);
                // }
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
            
                let ctx = document.getElementById("canvas")
                
                   console.log(ctx+"10")
                if(ctx){
                if(ctx instanceof HTMLCanvasElement){
                    console.log("Dd7")
                 // var myC=new Chart(ctx,{});
                   var myChart= new Chart(ctx, {
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

    gettingApiData2(){
       // console.log("gh hna")
            const req = this.myapiService.getAnswerQuesstionaire3QuestionMonthly02();
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
            
                let ctx2 = document.getElementById("canvas2")
                
                   console.log(ctx2+"2")
                if(ctx2){
                if(ctx2 instanceof HTMLCanvasElement){
                   // console.log("Dd7")
                 // var myC=new Chart(ctx,{});
                   var myChart= new Chart(ctx2, {
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
    gettingApiData3(){
        console.log("gh hna")
            const req = this.myapiService.getAnswerQuesstionaire3QuestionMonthly03();
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
            
                let ctx = document.getElementById("canvas3")
                
                   console.log(ctx+"10")
                if(ctx){
                if(ctx instanceof HTMLCanvasElement){
                    console.log("Dd7")
                 // var myC=new Chart(ctx,{});
                   var myChart= new Chart(ctx, {
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
    gettingApiData4(){
        console.log("gh hna")
            const req = this.myapiService.getAnswerQuesstionaire3QuestionMonthly04();
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
            
                let ctx = document.getElementById("canvas4")
                
                   console.log(ctx+"10")
                if(ctx){
                if(ctx instanceof HTMLCanvasElement){
                    console.log("Dd7")
                 // var myC=new Chart(ctx,{});
                   var myChart= new Chart(ctx, {
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
    gettingApiData5(){
        //console.log("gh hna")
        const req = this.myapiService.getAnswerQuesstionaire3QuestionMonthly05();
        req.subscribe( resp => {
            const httpStatus = resp['status'];
           // console.log(httpStatus)
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
        
            let ctx = document.getElementById("canvas5")
            
               console.log(ctx+"10")
            if(ctx){
            if(ctx instanceof HTMLCanvasElement){
                console.log("Dd7")
             // var myC=new Chart(ctx,{});
               var myChart= new Chart(ctx, {
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
    gettingApiData6(){
        console.log("gh hna")
        const req = this.myapiService.getAnswerQuesstionaire3QuestionMonthly06();
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
        
            let ctx = document.getElementById("canvas6")
            
               console.log(ctx+"10")
            if(ctx){
            if(ctx instanceof HTMLCanvasElement){
                console.log("Dd7")
             // var myC=new Chart(ctx,{});
               var myChart= new Chart(ctx, {
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
    gettingApiData7(){
      //  console.log("gh hna")
        const req = this.myapiService.getAnswerQuesstionaire3QuestionMonthly07();
        req.subscribe( resp => {
            const httpStatus = resp['status'];
      //      console.log(httpStatus)
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
        
            let ctx = document.getElementById("canvas7")
            
               console.log(ctx+"10")
            if(ctx){
            if(ctx instanceof HTMLCanvasElement){
                console.log("Dd7")
             // var myC=new Chart(ctx,{});
               var myChart= new Chart(ctx, {
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
       // console.log("gh hna")
        const req = this.myapiService.getAnswerQuesstionaire3QuestionMonthly08();
        req.subscribe( resp => {
            const httpStatus = resp['status'];
        //    console.log(httpStatus)
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
        
            let ctx = document.getElementById("canvas8")
            
               console.log(ctx+"10")
            if(ctx){
            if(ctx instanceof HTMLCanvasElement){
                console.log("Dd7")
             // var myC=new Chart(ctx,{});
               var myChart= new Chart(ctx, {
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
      //  console.log("gh hna")
        const req = this.myapiService.getAnswerQuesstionaire3QuestionMonthly09();
        req.subscribe( resp => {
            const httpStatus = resp['status'];
            //console.log(httpStatus)
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
        
            let ctx = document.getElementById("canvas9")
            
               console.log(ctx+"10")
            if(ctx){
            if(ctx instanceof HTMLCanvasElement){
                console.log("Dd7")
             // var myC=new Chart(ctx,{});
               var myChart= new Chart(ctx, {
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
       // console.log("gh hna")
        const req = this.myapiService.getAnswerQuesstionaire3QuestionMonthly10();
        req.subscribe( resp => {
            const httpStatus = resp['status'];
         //   console.log(httpStatus)
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
        
            let ctx = document.getElementById("canvas10")
            
               console.log(ctx+"10")
            if(ctx){
            if(ctx instanceof HTMLCanvasElement){
                console.log("Dd7")
             // var myC=new Chart(ctx,{});
               var myChart= new Chart(ctx, {
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