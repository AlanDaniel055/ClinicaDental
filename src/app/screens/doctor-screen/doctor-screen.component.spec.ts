import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorScreenComponent } from './doctor-screen.component';

describe('DoctorScreenComponent', () => {
  let component: DoctorScreenComponent;
  let fixture: ComponentFixture<DoctorScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorScreenComponent]
    });
    fixture = TestBed.createComponent(DoctorScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
