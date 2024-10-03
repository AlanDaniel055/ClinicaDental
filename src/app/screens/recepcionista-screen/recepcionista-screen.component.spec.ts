import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepcionistaScreenComponent } from './recepcionista-screen.component';

describe('RecepcionistaScreenComponent', () => {
  let component: RecepcionistaScreenComponent;
  let fixture: ComponentFixture<RecepcionistaScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecepcionistaScreenComponent]
    });
    fixture = TestBed.createComponent(RecepcionistaScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
