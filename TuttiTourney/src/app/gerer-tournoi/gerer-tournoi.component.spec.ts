import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GererTournoiComponent } from './gerer-tournoi.component';

describe('GererTournoiComponent', () => {
  let component: GererTournoiComponent;
  let fixture: ComponentFixture<GererTournoiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GererTournoiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GererTournoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
