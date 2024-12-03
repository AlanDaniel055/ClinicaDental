import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilDentistaScreenComponent } from './perfil-dentista-screen.component';

describe('PerfilDentistaScreenComponent', () => {
  let component: PerfilDentistaScreenComponent;
  let fixture: ComponentFixture<PerfilDentistaScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerfilDentistaScreenComponent]
    });
    fixture = TestBed.createComponent(PerfilDentistaScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
