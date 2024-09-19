import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilPacienteScreenComponent } from './perfil-paciente-screen.component';

describe('PerfilPacienteScreenComponent', () => {
  let component: PerfilPacienteScreenComponent;
  let fixture: ComponentFixture<PerfilPacienteScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerfilPacienteScreenComponent]
    });
    fixture = TestBed.createComponent(PerfilPacienteScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
