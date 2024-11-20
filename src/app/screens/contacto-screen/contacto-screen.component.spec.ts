import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactoScreenComponent } from './contacto-screen.component';

describe('ContactoScreenComponent', () => {
  let component: ContactoScreenComponent;
  let fixture: ComponentFixture<ContactoScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactoScreenComponent]
    });
    fixture = TestBed.createComponent(ContactoScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
