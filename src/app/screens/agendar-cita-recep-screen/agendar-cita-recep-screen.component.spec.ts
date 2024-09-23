import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendarCitaRecepScreenComponent } from './agendar-cita-recep-screen.component';

describe('AgendarCitaRecepScreenComponent', () => {
  let component: AgendarCitaRecepScreenComponent;
  let fixture: ComponentFixture<AgendarCitaRecepScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgendarCitaRecepScreenComponent]
    });
    fixture = TestBed.createComponent(AgendarCitaRecepScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
