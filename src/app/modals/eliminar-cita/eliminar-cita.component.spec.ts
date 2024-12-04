import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarCitaComponent } from './eliminar-cita.component';

describe('EliminarCitaComponent', () => {
  let component: EliminarCitaComponent;
  let fixture: ComponentFixture<EliminarCitaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EliminarCitaComponent]
    });
    fixture = TestBed.createComponent(EliminarCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
