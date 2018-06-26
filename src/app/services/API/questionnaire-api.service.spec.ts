import { TestBed, inject } from '@angular/core/testing';

import { QuestionnaireApiService } from './questionnaire-api.service';

describe('QuestionnaireApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuestionnaireApiService]
    });
  });

  it('should be created', inject([QuestionnaireApiService], (service: QuestionnaireApiService) => {
    expect(service).toBeTruthy();
  }));
});
