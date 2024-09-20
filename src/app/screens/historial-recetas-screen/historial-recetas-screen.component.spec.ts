import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialRecetasScreenComponent } from './historial-recetas-screen.component';

describe('HistorialRecetasScreenComponent', () => {
  let component: HistorialRecetasScreenComponent;
  let fixture: ComponentFixture<HistorialRecetasScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistorialRecetasScreenComponent]
    });
    fixture = TestBed.createComponent(HistorialRecetasScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
