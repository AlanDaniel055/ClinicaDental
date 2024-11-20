import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPacientesScreenComponent } from './lista-pacientes-screen.component';

describe('ListaPacientesScreenComponent', () => {
  let component: ListaPacientesScreenComponent;
  let fixture: ComponentFixture<ListaPacientesScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaPacientesScreenComponent]
    });
    fixture = TestBed.createComponent(ListaPacientesScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
