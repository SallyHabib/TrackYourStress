import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyQuestionnairesComponent } from './my-questionnaires.component';

describe('MyQuestionnairesComponent', () => {
  let component: MyQuestionnairesComponent;
  let fixture: ComponentFixture<MyQuestionnairesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyQuestionnairesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyQuestionnairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
