import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoirTournoiComponent } from './voir-tournoi.component';

describe('VoirTournoiComponent', () => {
  let component: VoirTournoiComponent;
  let fixture: ComponentFixture<VoirTournoiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoirTournoiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoirTournoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
