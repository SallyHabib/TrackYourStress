import {Component, OnDestroy, OnInit} from '@angular/core';
import { QuestionnaireApiService } from '../../services/API/questionnaire-api.service';
import { SpinnerService } from '../../services/spinner.service';
import { MyApiService } from '../../services/API/my-api.service';
import { ActivatedRoute } from '@angular/router';
import { QuestionnaireStructure } from '../../models/questionnaire-structure';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import {TokenrefresherService} from '../../services/API/tokenrefresher.service';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {ISubscription} from 'rxjs/Subscription';
import {DeviceDetectorService} from 'ngx-device-detector';
import {QuestionnaireService} from '../../services/questionnaire.service';
import {Questionnaire} from '../../models/questionnaire';
import {DatePipe} from '@angular/common';
const { version: appVersion, name: appName } = require('../../../../package.json');

@Component({
  selector: 'app-questionnaire-structure',
  templateUrl: './questionnaire-structure.component.html',
  styleUrls: ['./questionnaire-structure.component.css'],
  providers: [DatePipe]
})
export class QuestionnaireStructureComponent implements OnInit, OnDestroy {

  // selected questionnaire
  questionnaire: Questionnaire;

  questionnaireStructures: QuestionnaireStructure[] = [];
  questionnaireId = this.route.snapshot.paramMap.get('id');

  langChangeSubscription: ISubscription;

  // age is needed for the thl questionnaire
  age = 30;
  // is needed for the thl modal
  selectedTHLQuestStruct: QuestionnaireStructure = null;
  selectedTHLRow = '';
  selectedTHLYear = 0;

  constructor(
    private questionnaireApiService: QuestionnaireApiService,
    private spinnerService: SpinnerService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private myapiService: MyApiService,
    private router: Router,
    private tokenrefresher: TokenrefresherService,
    private translate: TranslateService,
    private deviceService: DeviceDetectorService,
    private questionnaireService: QuestionnaireService,
    private datePipe: DatePipe
  ) {
    // listen to language changes
    this.langChangeSubscription = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.ngOnInit();
    });
    // set the selected questionnaire
    this.questionnaire = this.questionnaireService.selectedQuestionnaire;
  }

  changeSliderappearance(questStruct: QuestionnaireStructure) {
    questStruct.sliderclass = 'sliderAfter';

    // update time of answering
    this.updateCollected_at(questStruct);
  }

  checkSingleChoice(questStruct: QuestionnaireStructure, index: number) {
    // reset all values to false
    for (const singleChoice in questStruct.isSingleChecked) {
      if (questStruct.isSingleChecked.hasOwnProperty(singleChoice)) {
        questStruct.isSingleChecked[singleChoice] = false;
      }
    }
    questStruct.isSingleChecked[index] = true;

    // update time of answering
    this.updateCollected_at(questStruct);
  }

  checkMultipleChoice(questStruct: QuestionnaireStructure, index: number) {
    if (questStruct.isMultipleChecked[index] == null) {
      questStruct.isMultipleChecked[index] = true;
    } else if (questStruct.isMultipleChecked[index] === true) {
      questStruct.isMultipleChecked[index] = false;
    } else if (questStruct.isMultipleChecked[index] === false) {
      questStruct.isMultipleChecked[index] = true;
    }
    // update time of answering
    this.updateCollected_at(questStruct);
  }

  checkSam(questStruct: QuestionnaireStructure, index: number, samFaceBool: boolean) {
    if (samFaceBool) {
      // reset all values to false
      for (const samFace in questStruct.isSamFaceChecked) {
        if (questStruct.isSamFaceChecked.hasOwnProperty(samFace)) {
          questStruct.isSamFaceChecked[samFace] = false;
        }
      }
      questStruct.isSamFaceChecked[index] = true;
    } else {
      // reset all values to false
      for (const samBody in questStruct.isSamBodyChecked) {
        if (questStruct.isSamBodyChecked.hasOwnProperty(samBody)) {
          questStruct.isSamBodyChecked[samBody] = false;
        }
      }
      questStruct.isSamBodyChecked[index] = true;
    }
    // update time of answering
    this.updateCollected_at(questStruct);
  }

  checkTHLItem(value: string) {
    if (this.selectedTHLRow === 'A') {
      this.selectedTHLQuestStruct.aSkala[this.selectedTHLYear] = value;
    } else if (this.selectedTHLRow === 'B') {
      this.selectedTHLQuestStruct.bSkala[this.selectedTHLYear] = value;
    } else if (this.selectedTHLRow === 'C') {
      this.selectedTHLQuestStruct.cSkala[this.selectedTHLYear] = value;
    }
    // update time of answering
    this.updateCollected_at(this.selectedTHLQuestStruct);
  }

  // is needed for the thl modal
  changeSelectedTHLItem(selectedQuestStruct: QuestionnaireStructure, selectedRow: string, selectedYear: number) {
    this.selectedTHLQuestStruct = selectedQuestStruct;
    this.selectedTHLRow = selectedRow;
    this.selectedTHLYear = selectedYear;
  }

  ngOnInit() {
    this.spinnerService.showSpinner();
    const req = this.questionnaireApiService.getQuestionnaireStructure(Number(this.questionnaireId));
    req.subscribe( resp => {
      // make sure that the array contains nothing (this is the case, when e.g. multiple http requests are
      // in the same time
      if (this.questionnaireStructures.length !== 0) {
        this.questionnaireStructures = [];
      }
      const questionnaireStructuresHTTP = resp['body']['data'];
      for (const questionnaireStructHTTP of questionnaireStructuresHTTP) {
        if (questionnaireStructHTTP['attributes']['content']['questiontype'] === 'SingleChoice' ||
          questionnaireStructHTTP['attributes']['content']['questiontype'] === 'MultipleChoice' ||
          questionnaireStructHTTP['attributes']['content']['questiontype'] === 'YesNoSwitch'
        ) {
          this.questionnaireStructures.push(
            new QuestionnaireStructure(
              questionnaireStructHTTP['id'],
              questionnaireStructHTTP['attributes']['name'],
              questionnaireStructHTTP['attributes']['elementtype'],
              questionnaireStructHTTP['attributes']['content']['headline'],
              questionnaireStructHTTP['attributes']['content']['text'],
              questionnaireStructHTTP['attributes']['content']['question'],
              questionnaireStructHTTP['attributes']['content']['required'],
              questionnaireStructHTTP['attributes']['content']['questiontype'],
              questionnaireStructHTTP['attributes']['content']['label'],
              questionnaireStructHTTP['attributes']['content']['answers'],
              questionnaireStructHTTP['attributes']['content']['values'],
              [],
              [],
              [],
              null,
              null,
              null,
              'sliderBefore',
              null,
              [],
              [],
              '',
              '',
              null,
              [],
              [],
              [],
              [],
              [],
              0
            )
          );
        } else if (questionnaireStructHTTP['attributes']['content']['questiontype'] === 'Slider') {
          this.questionnaireStructures.push(
            new QuestionnaireStructure(
              questionnaireStructHTTP['id'],
              questionnaireStructHTTP['attributes']['name'],
              questionnaireStructHTTP['attributes']['elementtype'],
              questionnaireStructHTTP['attributes']['content']['headline'],
              questionnaireStructHTTP['attributes']['content']['text'],
              questionnaireStructHTTP['attributes']['content']['question'],
              questionnaireStructHTTP['attributes']['content']['required'],
              questionnaireStructHTTP['attributes']['content']['questiontype'],
              questionnaireStructHTTP['attributes']['content']['label'],
              [questionnaireStructHTTP['attributes']['content']['answers'][0]['label'],
                questionnaireStructHTTP['attributes']['content']['answers'][1]['label']
              ],
              [],
              [questionnaireStructHTTP['attributes']['content']['values']['min'],
                questionnaireStructHTTP['attributes']['content']['values']['max'],
                questionnaireStructHTTP['attributes']['content']['values']['step']
              ],
              [],
              [],
              null,
              null,
              null,
              'sliderBefore',
              null,
              [],
              [],
              '',
              '',
              null,
              [],
              [],
              [],
              [],
              [],
              0
            )
          );
        } else if (questionnaireStructHTTP['attributes']['content']['questiontype'] === 'SAMScaleFace' ||
          questionnaireStructHTTP['attributes']['content']['questiontype'] === 'SAMScaleBody') {
          this.questionnaireStructures.push(
            new QuestionnaireStructure(
              questionnaireStructHTTP['id'],
              questionnaireStructHTTP['attributes']['name'],
              questionnaireStructHTTP['attributes']['elementtype'],
              questionnaireStructHTTP['attributes']['content']['headline'],
              questionnaireStructHTTP['attributes']['content']['text'],
              questionnaireStructHTTP['attributes']['content']['question'],
              questionnaireStructHTTP['attributes']['content']['required'],
              questionnaireStructHTTP['attributes']['content']['questiontype'],
              questionnaireStructHTTP['attributes']['content']['label'],
              questionnaireStructHTTP['attributes']['content']['answers'],
              [],
              [],
              [questionnaireStructHTTP['attributes']['content']['values']['min'],
                questionnaireStructHTTP['attributes']['content']['values']['max'],
                questionnaireStructHTTP['attributes']['content']['values']['step']
              ],
              [],
              null,
              null,
              null,
              'sliderBefore',
              null,
              [],
              [],
              '',
              '',
              null,
              [],
              [],
              [],
              [],
              [],
              0
            )
          );
        } else if (questionnaireStructHTTP['attributes']['content']['questiontype'] === 'THLItem') {
          this.questionnaireStructures.push(
            new QuestionnaireStructure(
              questionnaireStructHTTP['id'],
              questionnaireStructHTTP['attributes']['name'],
              questionnaireStructHTTP['attributes']['elementtype'],
              questionnaireStructHTTP['attributes']['content']['headline'],
              questionnaireStructHTTP['attributes']['content']['text'],
              questionnaireStructHTTP['attributes']['content']['question'],
              questionnaireStructHTTP['attributes']['content']['required'],
              questionnaireStructHTTP['attributes']['content']['questiontype'],
              questionnaireStructHTTP['attributes']['content']['label'],
              questionnaireStructHTTP['attributes']['content']['answers'],
              [],
              [],
              [],
              [],
              questionnaireStructHTTP['attributes']['content']['answers']['min'],
              questionnaireStructHTTP['attributes']['content']['answers']['max'],
              questionnaireStructHTTP['attributes']['content']['answers']['rows'],
              'sliderBefore',
              null,
              [],
              [],
              '',
              '',
              null,
              [],
              [],
              [],
              [],
              [],
              0
            )
          );
        } else {
          // this case is for TextString/TextArea and TextDate and TextInteger
          this.questionnaireStructures.push(
            new QuestionnaireStructure(
              questionnaireStructHTTP['id'],
              questionnaireStructHTTP['attributes']['name'],
              questionnaireStructHTTP['attributes']['elementtype'],
              questionnaireStructHTTP['attributes']['content']['headline'],
              questionnaireStructHTTP['attributes']['content']['text'],
              questionnaireStructHTTP['attributes']['content']['question'],
              questionnaireStructHTTP['attributes']['content']['required'],
              questionnaireStructHTTP['attributes']['content']['questiontype'],
              questionnaireStructHTTP['attributes']['content']['label'],
              questionnaireStructHTTP['attributes']['content']['answers'],
              [],
              [],
              [],
              [],
              null,
              null,
              null,
              'sliderBefore',
              null,
              [],
              [],
              '',
              '',
              null,
              [],
              [],
              [],
              [],
              [],
              0
            )
          );
        }
      }
      this.spinnerService.hideSpinner();
    }, err => {
      const status = err['status'];
      this.spinnerService.hideSpinner();
      if (status === 401) {
        // token is expired
        this.tokenrefresher.refreshToken().subscribe(httpStatus => {
          console.log('httpStatus vom refresh: ' + httpStatus);
          if (httpStatus === 200) {
            this.ngOnInit();
          }
        });
      }
    });
  }

  // unsubscribes when the component is destroyed
  ngOnDestroy() {
    // do not refresh the component, on a languageChange
    this.langChangeSubscription.unsubscribe();
  }

  updateCollected_at(questStruct: QuestionnaireStructure) {
    let currentTime = Date.now();
    // php-timestamp
    currentTime = Math.floor(currentTime / 1000);
    questStruct.collected_at = currentTime;
  }

  generateJsonData() {
    this.spinnerService.showSpinner();
    let answerArray = [];

    for (const questStruct of this.questionnaireStructures) {
      if (questStruct.questionType === 'Slider' && questStruct.sliderValue !== null) {
        const sliderAnswer = {
          'label' : questStruct.label,
          'collected_at' : questStruct.collected_at,
          'value' : questStruct.sliderValue
        };
        answerArray.push(sliderAnswer);
      } else if (questStruct.questionType === 'SingleChoice' && questStruct.isSingleChecked.length !== 0) {
        for (const singleChoiceValue in questStruct.isSingleChecked) {
          if (questStruct.isSingleChecked[singleChoiceValue] === true) {
            const singleChoiceAnswer = {
              'label' : questStruct.label,
              'collected_at' : questStruct.collected_at,
              'value' : questStruct.singleAndMultValues[singleChoiceValue]
            };
            answerArray.push(singleChoiceAnswer);
          }
        }
      } else if (questStruct.questionType === 'MultipleChoice' && questStruct.isMultipleChecked.length !== 0) {
        const checkedValues = [];
        for (const multipleChoiceValue in questStruct.isMultipleChecked) {
          if (questStruct.isMultipleChecked[multipleChoiceValue] === true) {
            checkedValues.push(questStruct.singleAndMultValues[multipleChoiceValue]);
          }
        }
        const multipleChoiceAnswer = {
          'label' : questStruct.label,
          'collected_at' : questStruct.collected_at,
          'value' : checkedValues
        };
        answerArray.push(multipleChoiceAnswer);
      } else if (questStruct.questionType === 'TextString' && questStruct.textStringAnswer !== '' ||
        questStruct.questionType === 'TextArea' && questStruct.textStringAnswer !== '') {
        const textStringAnswer = {
          'label' : questStruct.label,
          'collected_at' : questStruct.collected_at,
          'value' : questStruct.textStringAnswer
        };
        answerArray.push(textStringAnswer);
      } else if (questStruct.questionType === 'TextDate' && questStruct.textDateAnswer !== '') {
        const textDateAnswer = {
          'label' : questStruct.label,
          'collected_at' : questStruct.collected_at,
          'value' : questStruct.textDateAnswer
        };
        answerArray.push(textDateAnswer);
      } else if (questStruct.questionType === 'YesNoSwitch' && questStruct.isSingleChecked.length !== 0) {
        // yesNoSwitch saves its answers in the singleChoice answers
        if (questStruct.isSingleChecked[0] === true) {
          const yesNoAnswer = {
            'label' : questStruct.label,
            'collected_at' : questStruct.collected_at,
            'value' : questStruct.singleAndMultValues[0]
          };
          answerArray.push(yesNoAnswer);
        } else {
          const yesNoAnswer = {
            'label' : questStruct.label,
            'collected_at' : questStruct.collected_at,
            'value' : questStruct.singleAndMultValues[1]
          };
          answerArray.push(yesNoAnswer);
        }
      } else if (questStruct.questionType === 'SAMScaleFace' && questStruct.isSamFaceChecked.length !== 0) {
        for (const samFaceValue in questStruct.isSamFaceChecked) {
          if (questStruct.isSamFaceChecked[samFaceValue] === true) {
            const samFaceAnswer = {
              'label' : questStruct.label,
              'collected_at' : questStruct.collected_at,
              'value' : Number(samFaceValue) + 1
            };
            answerArray.push(samFaceAnswer);
          }
        }
      } else if (questStruct.questionType === 'SAMScaleBody' && questStruct.isSamBodyChecked.length !== 0) {
        for (const samBodyValue in questStruct.isSamBodyChecked) {
          if (questStruct.isSamBodyChecked[samBodyValue] === true) {
            const samBodyAnswer = {
              'label' : questStruct.label,
              'collected_at' : questStruct.collected_at,
              'value' : Number(samBodyValue) + 1
            };
            answerArray.push(samBodyAnswer);
          }
        }
      } else if (questStruct.questionType === 'TextInteger' && questStruct.textInteger !== null) {
        const TextIntegerAnswer = {
          'label' : questStruct.label,
          'collected_at' : questStruct.collected_at,
          'value' : questStruct.textInteger
        };
        answerArray.push(TextIntegerAnswer);
      } else if (questStruct.questionType === 'THLItem' && (questStruct.aSkala.length !== 0
      || questStruct.bSkala.length !== 0 || questStruct.cSkala.length !== 0)) {

        let endAge = this.age;
        if (questStruct.thlMax !== null) {
          endAge = questStruct.thlMax;
        }
        const jsonValue: any = {};
        // user entered at least one value
        if (questStruct.aSkala.length !== 0) {
          jsonValue['A'] = {};
        }
        if (questStruct.bSkala.length !== 0) {
          jsonValue['B'] = {};
        }
        if (questStruct.cSkala.length !== 0) {
          jsonValue['C'] = {};
        }

        // aSkala
        for (let i = questStruct.thlMin; i <= endAge; i++) {
          if (questStruct.aSkala[i] !== undefined) {
            jsonValue['A'][i] = questStruct.aSkala[i];
          }
        }
        // bSkala
        for (let i = questStruct.thlMin; i <= endAge; i++) {
          if (questStruct.bSkala[i] !== undefined) {
            jsonValue['B'][i] = questStruct.bSkala[i];
          }
        }
        // cSkala
        for (let i = questStruct.thlMin; i <= endAge; i++) {
          if (questStruct.cSkala[i] !== undefined) {
            jsonValue['C'][i] = questStruct.cSkala[i];
          }
        }
        const thlItemAnswer = {
          'label' : questStruct.label,
          'collected_at' : questStruct.collected_at,
          'value': jsonValue
        };
        answerArray.push(thlItemAnswer);
      }
    }

    const deviceInfos = this.deviceService.getDeviceInfo();

    // generate the client infos
    const clientInfo = {
      'name' : appName + ' ' + appVersion,
      'device' : deviceInfos.userAgent,
      'os' : deviceInfos.os_version
    };

    const req = this.questionnaireApiService.postAnswersheet(Number(this.questionnaireId), answerArray, clientInfo);
    req.subscribe( resp => {
      this.spinnerService.hideSpinner();
      const status = resp['status'];
      if (status === 201) {
        // nextAnswerDate is only for the alert-message
        const nextAnswerDate = new Date();
        nextAnswerDate.setDate( nextAnswerDate.getDate() + this.questionnaire.every);
        const nextAnswerDateString = this.datePipe.transform(nextAnswerDate, 'dd.MM.yy');
        this.router.navigate(['/member']);
        // normal message for oneTime questionnaires
        if (this.questionnaire.is_onetime === 1 || this.questionnaire.every === 1) {
          this.translate.get('SuccessSendAnswers').subscribe((res: string) => {
            this.alertService.enterMessage(res + "you gained 200 points", 0);
          });
          const req = this.myapiService.updateMyPoints(200);
          req.subscribe( resp => {
              const httpStatus = resp['status'];
              console.log(resp)
          });
        } else if (this.questionnaire.is_multiple === 1 && this.questionnaire.every !== 1) {
          // say to the users, that they should fill out the questionnaire according to the date
          this.translate.get('SuccessSendAnswersAndDate', {date: nextAnswerDateString}).subscribe((res: string) => {
            this.alertService.enterMessage(res + "you gained 200 points", 0);
          });
          const req = this.myapiService.updateMyPoints(200);
          req.subscribe( resp => {
              const httpStatus = resp['status'];
              console.log(resp)
          });
        }
      } else {
        this.translate.get('ErrorSendAnswers').subscribe((res: string) => {
          this.alertService.enterMessage(res, 1);
        });
      }
    }, err => {
      this.spinnerService.hideSpinner();
      const status = err['status'];
      if (status === 201) {
        // nextAnswerDate is only for the alert-message
        const nextAnswerDate = new Date();
        nextAnswerDate.setDate( nextAnswerDate.getDate() + this.questionnaire.every);
        const nextAnswerDateString = this.datePipe.transform(nextAnswerDate, 'dd.MM.yy');
        this.router.navigate(['/member']);
        // normal message for oneTime questionnaires
        if (this.questionnaire.is_onetime === 1 || this.questionnaire.every === 1) {
          this.translate.get('SuccessSendAnswers').subscribe((res: string) => {
            this.alertService.enterMessage(res + "you gained 100 points", 0);
          });
          const req = this.myapiService.updateMyPoints(100);
          req.subscribe( resp => {
              const httpStatus = resp['status'];
              console.log(resp)
          });
        } else if (this.questionnaire.is_multiple === 1 && this.questionnaire.every !== 1) {
          // say to the users, that they should fill out the questionnaire according to the date
          this.translate.get('SuccessSendAnswersAndDate', {date: nextAnswerDateString}).subscribe((res: string) => {
            this.alertService.enterMessage(res + "you gained 100 points", 0);
          });
          const req = this.myapiService.updateMyPoints(100);
          req.subscribe( resp => {
              const httpStatus = resp['status'];
              console.log(resp)
          });
        }
      } else if (status === 401) {
        // token is expired
        this.tokenrefresher.refreshToken().subscribe(httpStatus => {
          if (httpStatus === 200) {
            // reset answerarray
            answerArray = [];
            this.generateJsonData();
          }
        });
      } else {
        this.translate.get('ErrorSendAnswers').subscribe((res: string) => {
          this.alertService.enterMessage(res, 1);
        });
      }
    });
  }

  /*
  * generates the array for the rows of a THL-Item
  * */
  generateTHLArray(startAge: number, endAge: number): number[] {
    const thlData: number[] = [];
    // if endAge is null, take the value from the class
    if (endAge === null) {
      endAge = this.age;
    }
    for (let vals = startAge; vals <= endAge; vals++) {
      thlData.push(vals);
    }
    return thlData;
  }

  /*
  this method returns an label of the buttons (THL-Item only!)
   */
  getValueOfTHLButton(questStruct: QuestionnaireStructure, i: number, rows: string): any {
    if (rows === 'A') {
      if (questStruct.aSkala[i] !== undefined) {
        return questStruct.aSkala[i];
      } else {
        return i;
      }
    } else if (rows === 'B') {
      if (questStruct.bSkala[i] !== undefined) {
        return questStruct.bSkala[i];
      } else {
        return i;
      }
    } else if (rows === 'C') {
      if (questStruct.cSkala[i] !== undefined) {
        return questStruct.cSkala[i];
      } else {
        return i;
      }
    }
  }

  /*
    change the integer-value when the user updates this value
   */
  updateIntegerValue(questStruct: QuestionnaireStructure) {
    this.age = questStruct.textInteger;
    // also update the answerTime
    this.updateCollected_at(questStruct);
  }

}
