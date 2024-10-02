import { TestBed } from '@angular/core/testing';

import { RecepcionistaService } from './recepcionista.service';

describe('RecepcionistaService', () => {
  let service: RecepcionistaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecepcionistaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
