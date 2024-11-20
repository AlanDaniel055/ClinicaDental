import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NosotrosScreenComponent } from './nosotros-screen.component';

describe('NosotrosScreenComponent', () => {
  let component: NosotrosScreenComponent;
  let fixture: ComponentFixture<NosotrosScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NosotrosScreenComponent]
    });
    fixture = TestBed.createComponent(NosotrosScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
