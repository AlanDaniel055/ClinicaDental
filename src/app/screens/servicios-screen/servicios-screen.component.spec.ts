import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosScreenComponent } from './servicios-screen.component';

describe('ServiciosScreenComponent', () => {
  let component: ServiciosScreenComponent;
  let fixture: ComponentFixture<ServiciosScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiciosScreenComponent]
    });
    fixture = TestBed.createComponent(ServiciosScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
