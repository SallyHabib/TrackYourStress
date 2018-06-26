import { Injectable } from '@angular/core';
import {Questionnaire} from '../models/questionnaire';

@Injectable()
export class QuestionnaireService {

  public selectedQuestionnaire: Questionnaire;

  constructor() { }

}
