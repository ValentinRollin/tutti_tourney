import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowEvenementsComponent } from './show-evenements.component';

describe('ShowEvenementsComponent', () => {
  let component: ShowEvenementsComponent;
  let fixture: ComponentFixture<ShowEvenementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowEvenementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowEvenementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
