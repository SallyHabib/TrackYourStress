import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { q03S02 } from './q03-S02.component';

describe('q03S02', () => {
  let component: q03S02;
  let fixture: ComponentFixture<q03S02>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ q03S02 ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(q03S02);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

