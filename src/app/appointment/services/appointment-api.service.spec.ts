import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AppointmentApiService } from './appointment-api.service';

describe('AppointmentApiService', () => {
  let service: AppointmentApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AppointmentApiService]
    });
    service = TestBed.inject(AppointmentApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch appointments by farmer ID', () => {
    const farmerId = 1;

    service.getAppointmentsByFarmerId(farmerId).subscribe(appointments => {
      expect(appointments).toBeDefined();
    });

    const req = httpMock.expectOne(`http://localhost:8080/api/v1/appointments?farmerId=${farmerId}`);
    expect(req.request.method).toBe('GET');
  });

  it('should fetch appointment by ID', () => {
    const appointmentId = 1;

    service.getOne(appointmentId).subscribe(appointment => {
      expect(appointment).toBeDefined();
    });

    const req = httpMock.expectOne(`http://localhost:8080/api/v1/appointments/${appointmentId}`);
    expect(req.request.method).toBe('GET');
  });

  it('should create a new appointment', () => {
    const newAppointment = { id: 1, farmerId: 1, message: 'Help with irrigation', availableDateId: 1, status: 'PENDING', meetingUrl: 'http://example.com/meeting' };

    service.create(newAppointment).subscribe(appointment => {
      expect(appointment).toBeDefined();
    });

    const req = httpMock.expectOne(`http://localhost:8080/api/v1/appointments`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newAppointment);
  });
});
