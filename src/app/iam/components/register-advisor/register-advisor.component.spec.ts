import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterAdvisorComponent } from './register-advisor.component';
import { of, throwError } from 'rxjs';
import { AuthenticationApiService } from '../../services/authentication-api.service';
import { ProfileApiService } from '../../../profile/services/profile-api.service';
import { Router } from '@angular/router';

describe('RegisterAdvisorComponent', () => {
  let component: RegisterAdvisorComponent;
  let fixture: ComponentFixture<RegisterAdvisorComponent>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;
  let authenticationApiService: jasmine.SpyObj<AuthenticationApiService>;
  let profileApiService: jasmine.SpyObj<ProfileApiService>;
  let router: Router;

  beforeEach(async () => {
    authenticationApiService = jasmine.createSpyObj('AuthenticationApiService', ['signUp', 'signIn']);
    profileApiService = jasmine.createSpyObj('ProfileApiService', ['create']);
    snackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [
        RegisterAdvisorComponent,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'asesor/citas', component: RegisterAdvisorComponent } // Mock route
        ]),
        BrowserAnimationsModule
      ],
      providers: [
        FormBuilder,
        { provide: MatSnackBar, useValue: snackBar },
        { provide: AuthenticationApiService, useValue: authenticationApiService },
        { provide: ProfileApiService, useValue: profileApiService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterAdvisorComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);

    component.registerForm = new FormBuilder().group({
      email: [''],
      password: [''],
      firstName: [''],
      lastName: [''],
      city: [''],
      country: [''],
      birthDate: [null],
      description: [''],
      photo: [''],
      occupation: [''],
      experience: [0],
      terms: [false]
    });

    fixture.detectChanges();
  });

  it('should show a success message when registration succeeds', fakeAsync(() => {
    authenticationApiService.signUp.and.returnValue(of({ id: 1, username: 'advisor@example.com', roles: ['ROLE_USER', 'ROLE_ADVISOR'] }));
    authenticationApiService.signIn.and.returnValue(of({ id: 1, username: 'advisor@example.com', token: 'fake-jwt-token' }));
    component.registerForm.controls['email'].setValue('advisor@example.com');
    component.registerForm.controls['password'].setValue('securepassword');
    component.registerForm.controls['firstName'].setValue('John');
    component.registerForm.controls['lastName'].setValue('Doe');
    component.registerForm.controls['city'].setValue('Lima');
    component.registerForm.controls['country'].setValue('Peru');
    component.registerForm.controls['birthDate'].setValue(new Date(1980, 0, 1));
    component.registerForm.controls['description'].setValue('Hello, I am an advisor.');
    component.registerForm.controls['photo'].setValue('photo-url');
    component.registerForm.controls['occupation'].setValue('Farm manager');
    component.registerForm.controls['experience'].setValue(10);
    component.registerForm.controls['terms'].setValue(true);
    profileApiService.create.and.returnValue(of({
      id: 1, userId: 1, firstName: 'John', lastName: 'Doe', city: 'Lima', country: 'Peru',
      birthDate: '1980-01-01', description: 'Hello, I am an advisor.', photo: 'photo-url', occupation: 'Farm manager', experience: 10
    }));
    spyOn(router, 'navigateByUrl'); // Spy on navigation
    fixture.detectChanges();

    component.onSubmit();
    tick();

    expect(router.navigateByUrl).toHaveBeenCalledWith('/asesor/citas');
    expect(snackBar.open).toHaveBeenCalledWith('Bienvenid@ John 🤗', 'Cerrar', { duration: 2000 });
  }));

  it('should show an error message when registration fails', fakeAsync(() => {
    authenticationApiService.signUp.and.returnValue(throwError(() => new Error('Registration failed')));
    component.registerForm.controls['email'].setValue('invalid@example.com');
    component.registerForm.controls['password'].setValue('invalidpassword');
    component.registerForm.controls['firstName'].setValue('John');
    component.registerForm.controls['lastName'].setValue('Doe');
    component.registerForm.controls['city'].setValue('Lima');
    component.registerForm.controls['country'].setValue('Peru');
    component.registerForm.controls['birthDate'].setValue(new Date(1980, 0, 1));
    component.registerForm.controls['description'].setValue('Hello, I am an advisor.');
    component.registerForm.controls['photo'].setValue('photo-url');
    component.registerForm.controls['occupation'].setValue('Farm manager');
    component.registerForm.controls['experience'].setValue(10);
    component.registerForm.controls['terms'].setValue(true);
    fixture.detectChanges();

    component.onSubmit();
    tick();

    expect(snackBar.open).toHaveBeenCalledWith('Error al registrar el asesor😥', 'Cerrar', { duration: 2000 });
  }));
});
