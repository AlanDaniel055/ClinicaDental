import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaDocScreenComponent } from './agenda-doc-screen.component';

describe('AgendaDocScreenComponent', () => {
  let component: AgendaDocScreenComponent;
  let fixture: ComponentFixture<AgendaDocScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgendaDocScreenComponent]
    });
    fixture = TestBed.createComponent(AgendaDocScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
