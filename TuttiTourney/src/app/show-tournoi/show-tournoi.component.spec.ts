import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTournoiComponent } from './show-tournoi.component';

describe('ShowTournoiComponent', () => {
  let component: ShowTournoiComponent;
  let fixture: ComponentFixture<ShowTournoiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowTournoiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTournoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
