import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { MapService } from './mapservice.service';
import { Constants } from './constants';

describe('MapserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        MapService,
        Constants
      ]
    });
  });

  it('should be created', inject([MapService], (service: MapService) => {
    expect(service).toBeTruthy();
  }));
});
