import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthenticationApiService } from './authentication-api.service';

describe('AuthenticationApiService', () => {
  let service: AuthenticationApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthenticationApiService]
    });
    service = TestBed.inject(AuthenticationApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send correct payload for signUp', () => {
    const mockUser = { username: 'testuser', password: 'password123', roles: ['ROLE_USER', 'ROLE_ADMIN'] };
    service.signUp(mockUser.username, mockUser.password, 'ROLE_ADMIN').subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`http://localhost:8080/api/v1/authentication/sign-up`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockUser);
    req.flush({ success: true });
  });

  it('should send correct payload for signIn and store token', () => {
    const mockUser = { username: 'testuser', password: 'password123' };
    const mockToken = 'mock-token';
    spyOn(service, 'newToken');

    service.signIn(mockUser.username, mockUser.password).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`http://localhost:8080/api/v1/authentication/sign-in`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockUser);
    req.flush({ token: mockToken });

    expect(service.newToken).toHaveBeenCalledWith(mockToken);
  });

  it('should return true if user is signed in', () => {
    localStorage.setItem('isLogged', 'true');
    expect(service.isSignedIn()).toBeTrue();
  });

  it('should return false if user is not signed in', () => {
    localStorage.setItem('isLogged', 'false');
    expect(service.isSignedIn()).toBeFalse();
  });
});
