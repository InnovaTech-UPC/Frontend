import { TestBed } from '@angular/core/testing';

import { ProfileApiService } from './profile-api.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('ProfileApiService', () => {
  let service: ProfileApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProfileApiService]
    });
    service = TestBed.inject(ProfileApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch profile by user ID', () => {
    const userId = 1;

    service.getProfileByUserId(userId).subscribe(profile => {
      expect(profile).toBeDefined();
    });

    const req = httpMock.expectOne(`http://localhost:8080/api/v1/profiles/${userId}/user`);
    expect(req.request.method).toBe('GET');
  });

  it('should create a new profile', () => {
    const newProfile = {id: 1, userId: 1, firstName: 'John', lastName: 'Doe', city: 'Lima', country: 'Peru',
      birthDate: '1980-01-01', description: 'Hello, I am an advisor.', photo: 'photo-url', occupation: 'Farm manager', experience: 10 };

    service.create(newProfile).subscribe(profile => {
      expect(profile).toBeDefined();
    });

    const req = httpMock.expectOne(`http://localhost:8080/api/v1/profiles`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newProfile);
  });
});
