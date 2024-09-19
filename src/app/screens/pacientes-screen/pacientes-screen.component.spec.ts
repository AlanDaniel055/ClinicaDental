import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientesScreenComponent } from './pacientes-screen.component';

describe('PacientesScreenComponent', () => {
  let component: PacientesScreenComponent;
  let fixture: ComponentFixture<PacientesScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PacientesScreenComponent]
    });
    fixture = TestBed.createComponent(PacientesScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
