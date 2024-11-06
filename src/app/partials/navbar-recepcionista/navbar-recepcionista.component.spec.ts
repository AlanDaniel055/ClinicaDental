import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarRecepcionistaComponent } from './navbar-recepcionista.component';

describe('NavbarRecepcionistaComponent', () => {
  let component: NavbarRecepcionistaComponent;
  let fixture: ComponentFixture<NavbarRecepcionistaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarRecepcionistaComponent]
    });
    fixture = TestBed.createComponent(NavbarRecepcionistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
