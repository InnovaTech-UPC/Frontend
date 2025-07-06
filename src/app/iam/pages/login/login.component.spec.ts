import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationApiService } from '../../services/authentication-api.service';
import { ProfileApiService } from '../../../profile/services/profile-api.service';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;
  let authenticationApiService: jasmine.SpyObj<AuthenticationApiService>;
  let profileApiService: jasmine.SpyObj<ProfileApiService>;

  beforeEach(async () => {
    authenticationApiService = jasmine.createSpyObj('AuthenticationApiService', ['signIn']);
    profileApiService = jasmine.createSpyObj('ProfileApiService', ['getProfileByUserId']);
    snackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: MatSnackBar, useValue: snackBar },
        { provide: AuthenticationApiService, useValue: authenticationApiService },
        { provide: ProfileApiService, useValue: profileApiService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show a success message when login succeeds', fakeAsync(() => {
    authenticationApiService.signIn.and.returnValue(of({ id: 1, username: 'john_doe', token: 'valid_token' }));
    profileApiService.getProfileByUserId.and.returnValue(of({
      id: 1, userId: 1, firstName: 'John', lastName: 'Doe', city: 'string', country: 'string',
      birthDate: 'string', description: 'string', photo: 'string', occupation: '', experience: 0
    }));
    component.loginForm.controls['email'].setValue('farmer@example.com');
    component.loginForm.controls['password'].setValue('validpassword');
    fixture.detectChanges();

    component.login();
    tick(); // Simulate the passage of time for async operations

    expect(snackBar.open).toHaveBeenCalledWith('Bienvenid@ John 🤗', 'Cerrar', { duration: 2000 });
  }));

  it('should show an error message when login fails', fakeAsync(() => {
    authenticationApiService.signIn.and.returnValue(throwError(() => new Error('Invalid credentials')));
    component.loginForm.controls['email'].setValue('wrong@example.com');
    component.loginForm.controls['password'].setValue('wrongpassword');
    fixture.detectChanges();

    component.login();
    tick(); // Simulate the passage of time for async operations

    expect(snackBar.open).toHaveBeenCalledWith('Error. Credenciales no encontradas😥', 'Cerrar', { duration: 3000 });
  }));
});
