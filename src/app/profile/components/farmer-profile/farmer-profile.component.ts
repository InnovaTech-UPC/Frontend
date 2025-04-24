import {Component, OnInit} from '@angular/core';
import {Profile} from "../../models/profile.model";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProfileApiService} from "../../services/profile-api.service";
import {UserApiService} from "../../services/user-api.service";
import {StorageService} from "../../../shared/services/storage.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {NgIf} from "@angular/common";

@Component({
  selector: 'farmer-profile',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatError,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatProgressSpinner,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './farmer-profile.component.html',
  styleUrl: './farmer-profile.component.css'
})
export class FarmerProfileComponent implements OnInit {
  profile: Profile = {
    id: 0,
    userId: 0,
    firstName: '',
    lastName: '',
    city: '',
    country: '',
    birthDate: '',
    description: '',
    photo: '',
    occupation: '',
    experience: 0
  }
  userId: number = 0;


  photo: any;
  selectedFileName = '';
  uploaded = true;
  isUploading = false;

  constructor(private profileApiService: ProfileApiService,
              private userApiService: UserApiService,
              private storageService: StorageService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.userId = this.userApiService.getUserId();
    this.getProfile();
  }

  getProfile() {
    this.profileApiService.getProfileByUserId(this.userId).subscribe({
      next: (profile: Profile) => {
        this.profile = profile;
        this.photo = profile.photo;
      },
      error: (error) => {
        console.error('Error fetching profile:', error);
      }
    });
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

  updateProfile() {
    this.profile = {
      ...this.profile,
      photo: this.photo
    }

    this.profileApiService.update(this.profile.id, this.profile).subscribe({
      next: () => {
        this.snackBar.open('Perfil actualizado correctamente 😁', 'Cerrar', {
          duration: 2000
        });
      },
      error: (error) => {
        console.error('Error updating profile:', error);
        this.snackBar.open('Error al actualizar el perfil 😢', 'Cerrar', {
          duration: 2000
        });
      }
    })

  }

}
