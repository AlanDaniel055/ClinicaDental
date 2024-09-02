import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingScreenComponent } from './landing-screen.component';

describe('LandingScreenComponent', () => {
  let component: LandingScreenComponent;
  let fixture: ComponentFixture<LandingScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LandingScreenComponent]
    });
    fixture = TestBed.createComponent(LandingScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
