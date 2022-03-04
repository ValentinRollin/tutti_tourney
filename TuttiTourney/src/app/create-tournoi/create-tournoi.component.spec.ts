import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTournoiComponent } from './create-tournoi.component';

describe('CreateTournoiComponent', () => {
  let component: CreateTournoiComponent;
  let fixture: ComponentFixture<CreateTournoiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTournoiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTournoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
