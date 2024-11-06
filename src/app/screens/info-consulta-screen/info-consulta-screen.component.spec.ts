import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoConsultaScreenComponent } from './info-consulta-screen.component';

describe('InfoConsultaScreenComponent', () => {
  let component: InfoConsultaScreenComponent;
  let fixture: ComponentFixture<InfoConsultaScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoConsultaScreenComponent]
    });
    fixture = TestBed.createComponent(InfoConsultaScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
