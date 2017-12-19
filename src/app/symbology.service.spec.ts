import { TestBed, inject } from '@angular/core/testing';

import { SymbologyService } from './symbology.service';

describe('SymbologyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SymbologyService]
    });
  });

  it('should be created', inject([SymbologyService], (service: SymbologyService) => {
    expect(service).toBeTruthy();
  }));
});
