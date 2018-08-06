import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { q02Component } from './q02.component';

describe('q02Component', () => {
  let component: q02Component;
  let fixture: ComponentFixture<q02Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ q02Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(q02Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

