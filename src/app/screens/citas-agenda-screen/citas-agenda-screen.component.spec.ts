import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasAgendaScreenComponent } from './citas-agenda-screen.component';

describe('CitasAgendaScreenComponent', () => {
  let component: CitasAgendaScreenComponent;
  let fixture: ComponentFixture<CitasAgendaScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CitasAgendaScreenComponent]
    });
    fixture = TestBed.createComponent(CitasAgendaScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
