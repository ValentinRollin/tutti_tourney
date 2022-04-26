import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournoisFinisComponent } from './tournois-finis.component';

describe('TournoisFinisComponent', () => {
  let component: TournoisFinisComponent;
  let fixture: ComponentFixture<TournoisFinisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TournoisFinisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TournoisFinisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
