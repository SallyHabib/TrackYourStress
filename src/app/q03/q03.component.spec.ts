import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { q03Component } from './q03.component';

describe('q03Component', () => {
  let component: q03Component;
  let fixture: ComponentFixture<q03Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ q03Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(q03Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

