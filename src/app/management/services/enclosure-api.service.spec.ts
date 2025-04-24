import { TestBed } from '@angular/core/testing';

import { EnclosureApiService } from './enclosure-api.service';

describe('EnclosureApiService', () => {
  let service: EnclosureApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnclosureApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
