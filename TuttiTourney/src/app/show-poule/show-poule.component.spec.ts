import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPouleComponent } from './show-poule.component';

describe('ShowPouleComponent', () => {
  let component: ShowPouleComponent;
  let fixture: ComponentFixture<ShowPouleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPouleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPouleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
