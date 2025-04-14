import { TestBed } from '@angular/core/testing';

import { FarmerApiService } from './farmer-api.service';

describe('FarmerApiService', () => {
  let service: FarmerApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FarmerApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
