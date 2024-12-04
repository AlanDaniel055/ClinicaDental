import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarUserComponent } from './eliminar-user.component';

describe('EliminarUserComponent', () => {
  let component: EliminarUserComponent;
  let fixture: ComponentFixture<EliminarUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EliminarUserComponent]
    });
    fixture = TestBed.createComponent(EliminarUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
