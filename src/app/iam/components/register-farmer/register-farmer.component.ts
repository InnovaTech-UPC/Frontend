import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatDatepickerModule, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatError, MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatNativeDateModule} from "@angular/material/core";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

import { UserApiService } from "../../../profile/services/user-api.service";
import { FarmerApiService } from "../../../profile/services/farmer-api.service";
import { AuthenticationApiService } from "../../services/authentication-api.service";

import {Profile} from "../../../profile/models/profile.model";
import {ProfileApiService} from "../../../profile/services/profile-api.service";
import {StorageService} from "../../../shared/services/storage.service";
import {MatIcon} from "@angular/material/icon";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {Farmer} from "../../../profile/models/farmer.model";

@Component({
  selector: 'register-farmer',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatDatepickerModule,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatError,
    MatFormField,
    MatHint,
    MatNativeDateModule,
    MatInput,
    MatLabel,
    MatSuffix,
    NgIf,
    ReactiveFormsModule,
    MatIcon,
    MatProgressSpinner
  ],
  templateUrl: './register-farmer.component.html',
  styleUrl: './register-farmer.component.css',
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-PE'}
  ]
})
export class RegisterFarmerComponent {

  registerForm: FormGroup = new FormGroup(
    {
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      city: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      birthDate: new FormControl(null, [Validators.required]),
      description: new FormControl('')
    }
  );

  minDate: Date;
  maxDate: Date;
  photo: any;
  selectedFileName = '';
  uploaded = false;
  isUploading = false;

  constructor(private dateAdapter: DateAdapter<Date>,
              private router: Router,
              private authenticationApiService: AuthenticationApiService,
              private userApiService: UserApiService,
              private farmerApiService: FarmerApiService,
              private profileApiService: ProfileApiService,
              private snackBar: MatSnackBar,
              private storageService: StorageService) {
    this.dateAdapter.setLocale('es-PE');
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 90, 0, 1);
    this.maxDate = new Date(currentYear - 18, 11, 31);
  }

  uploadImage(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.isUploading = true;
      const file = event.target.files[0];
      this.selectedFileName = file.name;
      console.log(file);
      let reader= new FileReader();
      let name = "FARMERPROFILEPHOTO_IMAGE_" + Date.now();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        console.log(reader.result);
        this.storageService.uploadFile(name, reader.result).then((url) => {
          console.log(url);
          this.photo = url;
          this.isUploading = false;
          this.uploaded = true;
        }).catch(() => {
          this.isUploading = false;
          this.snackBar.open('Error al subir la foto de perfil😓', 'Cerrar', {
            duration: 2000
          });
          return;
        })
      }
    }
  }

  async onSubmit() {
    try {
      if (!this.registerForm.valid) {
        return;
      }
      const signUpResponse = await this.authenticationApiService.signUp(this.registerForm.value.email, this.registerForm.value.password, 'ROLE_FARMER').toPromise();
      const signInResponse = await this.authenticationApiService.signIn(this.registerForm.value.email, this.registerForm.value.password).toPromise();
      const userId = signInResponse['id'];
      this.userApiService.setUserId(userId);
      this.userApiService.setLogged(true);

      await this.createProfile(userId);

      this.router.navigateByUrl('/granjero/mi-granja');
      this.snackBar.open('Bienvenid@ ' + this.registerForm.value.firstName + ' 🤗', 'Cerrar', { duration: 2000 });
    } catch (error) {
      this.snackBar.open('Error al registrar el granjero😥', 'Cerrar', {duration: 2000});
    }
  }

  async createProfile(userId: number) {
    const birthDate: Date = this.registerForm.value.birthDate;
    const birthDateString = birthDate.toISOString().split('T')[0];
    const profile: Profile = {
      id: 0,
      userId: userId,
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      city: this.registerForm.value.city,
      country: this.registerForm.value.country,
      birthDate: birthDateString,
      description: this.registerForm.value.description,
      photo: this.photo,
      occupation: '',
      experience: 0
    };
    try {
      const response = await this.profileApiService.create(profile).toPromise();
      this.userApiService.setIsFarmer(true);
      this.farmerApiService.getFarmerByUserId(response?.userId ?? 0).subscribe((farmer: Farmer) => {
        this.farmerApiService.setFarmerId(farmer.id);
      });
    } catch (error) {
      this.snackBar.open('Error al crear el perfil😥', 'Cerrar', { duration: 2000 });
      throw error;
    }
  }

  goBack() {
    this.registerForm.reset();
    window.history.back();
  }

}
