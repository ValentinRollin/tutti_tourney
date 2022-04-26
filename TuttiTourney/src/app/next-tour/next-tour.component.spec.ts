import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextTourComponent } from './next-tour.component';

describe('NextTourComponent', () => {
  let component: NextTourComponent;
  let fixture: ComponentFixture<NextTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NextTourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NextTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
