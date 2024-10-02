import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaDocScreensComponent } from './agenda-doc-screens.component';

describe('AgendaDocScreensComponent', () => {
  let component: AgendaDocScreensComponent;
  let fixture: ComponentFixture<AgendaDocScreensComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgendaDocScreensComponent]
    });
    fixture = TestBed.createComponent(AgendaDocScreensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
