import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MyApiService } from '../services/API/my-api.service';
import {TokenrefresherService} from '../services/API/tokenrefresher.service';
import { AlertService } from '../services/alert.service';
import { Subject } from 'rxjs/Subject';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {ISubscription} from 'rxjs/Subscription';
import { HighScore } from '../models/HighScores';


@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.css']
})
export class achievementsComponent implements OnInit {
    appearence:boolean
    langChangeSubscription: ISubscription;
    highscores:HighScore[]=[]

   
    constructor(
        private myapiService: MyApiService,
        private router: Router,
        private route: ActivatedRoute,
        private elementRef: ElementRef,
        private tokenrefresher: TokenrefresherService,
        private alertService: AlertService,
        private translate: TranslateService,


      ) {
        this.appearence=false
        this.langChangeSubscription = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
          this.ngOnInit();
         // this._close();
        });
        
        }

        ngOnInit() {
          let id = this.route.snapshot.paramMap.get('studyId');
          const req=  this.myapiService.getGamificationHighScore(Number(id));
          req.subscribe( resp => {
            const HighScores= resp['body']['data'];
          //  console.log(HighScores)
         //   this.highscores=HighScores;
            for (const highscore of HighScores) {
              //console.log(  highscore['attributes']['name'],)
              this.highscores.push(
                new HighScore(
                  highscore['attributes']['name'],
                  highscore['attributes']['email'],
                  highscore['attributes']['points'],
                  highscore['attributes']['picture'],
                )
              );
            }
          
          });
          
      }
       _close() {
        var mod = document.getElementById("di");
        mod.style.display = "none";
        this.translate.get('ErrorUnlockAchievements').subscribe((res: string) => {
          this.alertService.enterMessage(res, 1);
        });
        this.router.navigate(["/home"])
        
      }

      success() {
       
        this.translate.get('SuccessUnlockAchievements').subscribe((res: string) => {
          this.alertService.enterMessage(res, 0);
        });
        this.router.navigate(["/member/myquestionnaires"])
        
      }

}

