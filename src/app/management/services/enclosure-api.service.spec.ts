import { TestBed } from '@angular/core/testing';

import { EnclosureApiService } from './enclosure-api.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('EnclosureApiService', () => {
  let service: EnclosureApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EnclosureApiService]
    });
    service = TestBed.inject(EnclosureApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch enclosures by Farmer ID', () => {
    const farmerId = 1;

    service.getEnclosuresByFarmerId(farmerId).subscribe(enclosures => {
      expect(enclosures).toBeDefined();
    });

    const req = httpMock.expectOne(`http://localhost:8080/api/v1/enclosures?farmerId=${farmerId}`);
    expect(req.request.method).toBe('GET');
  });

  it('should fetch enclosure by ID', () => {
    const enclosureId = 1;

    service.getOne(enclosureId).subscribe(enclosure => {
      expect(enclosure).toBeDefined();
    });

    const req = httpMock.expectOne(`http://localhost:8080/api/v1/enclosures/${enclosureId}`);
    expect(req.request.method).toBe('GET');
  });

  it('should create a new enclosure', () => {
    const newEnclosure = { id: 1, name: 'Enclosure A', capacity: 30, type: 'Bovine', farmerId: 1 };

    service.create(newEnclosure).subscribe(enclosure => {
      expect(enclosure).toBeDefined();
    });

    const req = httpMock.expectOne(`http://localhost:8080/api/v1/enclosures`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newEnclosure);
  });
});
