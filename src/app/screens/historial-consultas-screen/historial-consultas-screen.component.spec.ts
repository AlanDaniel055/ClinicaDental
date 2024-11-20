import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialConsultasScreenComponent } from './historial-consultas-screen.component';

describe('HistorialConsultasScreenComponent', () => {
  let component: HistorialConsultasScreenComponent;
  let fixture: ComponentFixture<HistorialConsultasScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistorialConsultasScreenComponent]
    });
    fixture = TestBed.createComponent(HistorialConsultasScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
