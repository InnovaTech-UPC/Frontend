import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {Router, ActivatedRoute} from "@angular/router";
import {PostApiService} from "../../services/post-api.service";
import {AdvisorApiService} from "../../../profile/services/advisor-api.service";
import {StorageService} from "../../../shared/services/storage.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Post} from "../../models/post.model";

@Component({
  selector: 'post-detail',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    NgIf,
    ReactiveFormsModule,
    NgOptimizedImage
  ],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css'
})
export class PostDetailComponent implements OnInit {
  constructor(private router: Router,
              private ActivatedRoute: ActivatedRoute,
              private postApiService: PostApiService,
              private advisorApiService: AdvisorApiService,
              private storageService: StorageService,
              private snackBar: MatSnackBar) {
    this.postId = this.ActivatedRoute.snapshot.params['id'];
  }

  image: string | null = null;
  postId: number = 0;
  advisorId = 0;
  selectedFileName = '';
  isImageUploading = false;

  postForm: FormGroup = new FormGroup(
    {
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    }
  );

  ngOnInit() {
    this.advisorId = this.advisorApiService.getAdvisorId();
    if (this.postId !== 0) {
      this.postApiService.getOne(this.postId).subscribe({
        next: (post) => {
          this.postForm.patchValue({
            title: post.title,
            description: post.description,
          });
          this.image = post.image;
        },
        error: (error) => {
          console.error('Error fetching post:', error);
        }
      });
    }
  }

  onSubmit() {
    if(!this.image && this.selectedFileName === '') {
      this.snackBar.open('Debes seleccionar una imagen para la publicación😓', 'Cerrar', {
        duration: 2000,
      });
      return;
    }

    if(this.image === null) {
      this.snackBar.open('Error al subir la imagen de la publicación😥', 'Cerrar', {
        duration: 2000,
      });
      return;
    }

    const post: Post = {
      id: this.postId,
      advisorId: this.advisorId,
      title: this.postForm.get('title')?.value,
      description: this.postForm.get('description')?.value,
      image: this.image,
    };

    this.postApiService.update(post.id, post).subscribe({
      next: () => {
        this.snackBar.open('Publicación creada con éxito!🎉', 'Cerrar', {
          duration: 2000,
        });
        this.goToPosts();
      },
      error: (error) => {
        this.snackBar.open('Error al crear la publicación😥', 'Cerrar', {
          duration: 2000,
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
