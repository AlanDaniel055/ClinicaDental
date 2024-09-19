import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarUsuarioComponent } from './navbar-usuario.component';

describe('NavbarUsuarioComponent', () => {
  let component: NavbarUsuarioComponent;
  let fixture: ComponentFixture<NavbarUsuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarUsuarioComponent]
    });
    fixture = TestBed.createComponent(NavbarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
