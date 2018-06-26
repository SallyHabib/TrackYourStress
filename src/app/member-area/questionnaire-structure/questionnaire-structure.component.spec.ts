import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireStructureComponent } from './questionnaire-structure.component';

describe('QuestionnaireStructureComponent', () => {
  let component: QuestionnaireStructureComponent;
  let fixture: ComponentFixture<QuestionnaireStructureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionnaireStructureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
