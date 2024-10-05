import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasAgendaRecepScreenComponent } from './citas-agenda-recep-screen.component';

describe('CitasAgendaRecepScreenComponent', () => {
  let component: CitasAgendaRecepScreenComponent;
  let fixture: ComponentFixture<CitasAgendaRecepScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CitasAgendaRecepScreenComponent]
    });
    fixture = TestBed.createComponent(CitasAgendaRecepScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
