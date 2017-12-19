import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { MapserviceService } from './mapservice.service';
import { Constants } from './constants';

describe('MapserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        MapserviceService,
        Constants
      ]
    });
  });

  it('should be created', inject([MapserviceService], (service: MapserviceService) => {
    expect(service).toBeTruthy();
  }));
});
