import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendarCitaScreenComponent } from './agendar-cita-screen.component';

describe('AgendarCitaScreenComponent', () => {
  let component: AgendarCitaScreenComponent;
  let fixture: ComponentFixture<AgendarCitaScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgendarCitaScreenComponent]
    });
    fixture = TestBed.createComponent(AgendarCitaScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
