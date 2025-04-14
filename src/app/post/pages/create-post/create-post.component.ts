import {Component, OnInit} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { FormControl } from '@angular/forms';
import {PostApiService} from "../../services/post-api.service";
import {Router} from "@angular/router";
import {AdvisorApiService} from "../../../profile/services/advisor-api.service";
import {StorageService} from "../../../shared/services/storage.service";
import {Post} from "../../models/post.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";

@Component({
  selector: 'create-post',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    MatFormField,
    MatButton,
    MatInput,
    ReactiveFormsModule,
    MatLabel,
    NgIf,
  ],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent implements OnInit {
  constructor(private router: Router,
              private postApiService: PostApiService,
              private advisorApiService: AdvisorApiService,
              private storageService: StorageService,
              private snackBar: MatSnackBar) {
  }

  image: string | null = null;
  advisorId = 0;
  selectedFileName = '';
  isImageUploading = false;

  ngOnInit() {
    this.advisorId = this.advisorApiService.getAdvisorId();
  }

  postForm: FormGroup = new FormGroup(
    {
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    }
  );

  onSubmit() {
    if(this.selectedFileName === '') {
      this.snackBar.open('Debes seleccionar una imagen para la publicación😓', 'Cerrar', {
        duration: 5000,
      });
      return;
    }
    if(this.image === null) {
      this.snackBar.open('Error al subir la imagen de la publicación😥', 'Cerrar', {
        duration: 5000,
      });
      return;
    }

    const post: Post = {
      id: 0,
      advisorId: this.advisorId,
      title: this.postForm.get('title')?.value,
      description: this.postForm.get('description')?.value,
      image: this.image,
    };

    this.postApiService.create(post).subscribe({
      next: () => {
        this.snackBar.open('Publicación creada con éxito!🎉', 'Cerrar', {
          duration: 5000,
        });
        this.goToPosts();
      },
      error: (error) => {
        this.snackBar.open('Error al crear la publicación😥', 'Cerrar', {
          duration: 5000,
        });
        console.error('Error creating post:', error);
      }
    });
  }

  uploadImage(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.isImageUploading = true;
      const file = event.target.files[0];
      this.selectedFileName = file.name;
      let reader= new FileReader();
      let name = "POST_" + this.advisorId + "_IMAGE_" + Date.now();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.storageService.uploadFile(name, reader.result).then((url) => {
          this.image = url;
          this.isImageUploading = false;
        });
      }
    }
  }

  goBack() {
    window.history.back();
  }

  goToPosts() {
    this.router.navigate(['/asesor/mis-publicaciones']);
  }

  protected readonly document = document;
}
