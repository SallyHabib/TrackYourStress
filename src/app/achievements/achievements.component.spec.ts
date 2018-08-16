import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { achievementsComponent } from './achievements.component';

describe('achievementsComponent', () => {
  let component: achievementsComponent;
  let fixture: ComponentFixture<achievementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ achievementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(achievementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

