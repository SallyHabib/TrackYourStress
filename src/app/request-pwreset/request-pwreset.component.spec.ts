import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestPwresetComponent } from './request-pwreset.component';

describe('RequestPwresetComponent', () => {
  let component: RequestPwresetComponent;
  let fixture: ComponentFixture<RequestPwresetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestPwresetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestPwresetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
