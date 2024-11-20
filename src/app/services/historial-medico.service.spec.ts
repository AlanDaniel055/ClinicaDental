import { TestBed } from '@angular/core/testing';

import { HistorialMedicoService } from './historial-medico.service';

describe('HistorialMedicoService', () => {
  let service: HistorialMedicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistorialMedicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
