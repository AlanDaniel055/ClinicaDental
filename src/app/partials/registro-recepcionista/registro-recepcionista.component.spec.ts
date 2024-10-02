import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroRecepcionistaComponent } from './registro-recepcionista.component';

describe('RegistroRecepcionistaComponent', () => {
  let component: RegistroRecepcionistaComponent;
  let fixture: ComponentFixture<RegistroRecepcionistaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroRecepcionistaComponent]
    });
    fixture = TestBed.createComponent(RegistroRecepcionistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
