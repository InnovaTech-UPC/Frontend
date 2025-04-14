import {Component, OnInit} from '@angular/core';
import {Profile} from "../../../profile/models/profile.model";
import {Review} from "../../models/review.model";
import {ActivatedRoute, Router} from "@angular/router";
import {AdvisorApiService} from "../../../user/services/advisor-api.service";
import {ProfileApiService} from "../../../profile/services/profile-api.service";
import {ReviewApiService} from "../../services/review-api.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatCard, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {NgForOf, NgIf} from "@angular/common";
import {FarmerApiService} from "../../../user/services/farmer-api.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-new-view-review',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatCard,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    MatIconButton
  ],
  templateUrl: './new-review.component.html',
  styleUrl: './new-review.component.css'
})
export class NewReviewComponent implements OnInit {
  profile: Profile = {
    id: 0,
    userId: 0,
    firstName: "",
    lastName: "",
    city: "",
    country: "",
    birthDate: "",
    description: "",
    photo: "",
    occupation: "",
    experience: 0,
  };
  advisorId: number = 0;
  advisorDetails: any = {
    fullname: "",
    location: "",
    photo: ""
  };
  rating: number = 0;
  stars: boolean[] = Array(5).fill(false);
  comment: string = "";

  review: Review = {
    id: 0,
    farmerId: 0,
    advisorId: 0,
    comment: "",
    rating: 0
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private farmerApiService: FarmerApiService,
    private advisorApiService: AdvisorApiService,
    private profileApiService: ProfileApiService,
    private reviewApiService: ReviewApiService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.advisorId = params['id'];
      this.getAdvisor();
    });
  }

  getAdvisor(): void {
    this.advisorApiService.getOne(this.advisorId).subscribe(advisor => {
      this.profileApiService.getOne(advisor.userId).subscribe(profile => {
        this.profile = profile;
        this.advisorDetails = {
          fullname: `${this.profile.firstName} ${this.profile.lastName}`,
          location: `${this.profile.city}, ${this.profile.country}`,
          photo: this.profile.photo
        };
      });
    });
  }
  onSubmit() {
    this.review = {
      id: 0,
      farmerId: this.farmerApiService.getFarmerId(),
      advisorId: this.advisorId,
      rating: this.rating,
      comment: this.comment
    };
    this.reviewApiService.create(this.review).subscribe(
      () => {
        this.snackBar.open('Reseña guardada exitosamente 😎', 'Cerrar', { duration: 2000 });
        this.router.navigate(['granjero/citas']);
      },
      (error) => {
        this.snackBar.open('Error al guardar reseña 😓', 'Cerrar', { duration: 2000 });
        console.error('Error creating view-review:', error);
      }
    );
  }

  goBack() {
    window.history.back();
  }

  // CALIFICACION POR ESTRELLAS
  onStarClick(index: number): void {
    this.rating = index + 1;
    this.updateStars();
  }
  updateStars(): void {
    this.stars.fill(false);
    this.stars.fill(true, 0, this.rating);
  }

}
