import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournoisEnCoursComponent } from './tournois-en-cours.component';

describe('TournoisEnCoursComponent', () => {
  let component: TournoisEnCoursComponent;
  let fixture: ComponentFixture<TournoisEnCoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TournoisEnCoursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TournoisEnCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
