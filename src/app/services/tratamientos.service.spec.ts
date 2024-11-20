import { TestBed } from '@angular/core/testing';

import { TratamientosService } from './tratamientos.service';

describe('TratamientosService', () => {
  let service: TratamientosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TratamientosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
