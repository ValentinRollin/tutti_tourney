import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesTournoisComponent } from './mes-tournois.component';

describe('MesTournoisComponent', () => {
  let component: MesTournoisComponent;
  let fixture: ComponentFixture<MesTournoisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesTournoisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MesTournoisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
