import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {NgForOf} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {AdvisorApiService} from "../../../profile/services/advisor-api.service";
import {ProfileApiService} from "../../../profile/services/profile-api.service";
import {ReviewApiService} from "../../services/review-api.service";
import {FarmerApiService} from "../../../profile/services/farmer-api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Review} from "../../models/review.model";

@Component({
  selector: 'app-edit-view-review',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './edit-review.component.html',
  styleUrl: './edit-review.component.css'
})
export class EditReviewComponent implements OnInit {

  constructor(
    private advisorApiService: AdvisorApiService,
    private profileApiService: ProfileApiService,
    private reviewApiService: ReviewApiService,
    private farmerApiService: FarmerApiService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  reviewId = 0;
  rating = 0;
  stars: boolean[] = Array(5).fill(false);
  comment = '';
  advisorDetails: any;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.reviewId = +params['id'];
      this.getReview(this.reviewId);
    });
  }

  getReview(reviewId: number) {
    this.reviewApiService.getOne(reviewId).subscribe(
      (response) => {
        this.rating = response.rating;
        this.comment = response.comment;
        this.stars = Array(this.rating).fill(true).concat(Array(5 - this.rating).fill(false));
        this.getAdvisorDetails(response.advisorId);
      },
      (error) => {
        console.error('Error fetching view-review:', error);
      }
    );
  }

  getAdvisorDetails(advisorId: number) {
    this.advisorApiService.getOne(advisorId).subscribe(
      (advisor) => {
        this.profileApiService.getProfileByUserId(advisor.userId).subscribe((profile) => {
          this.advisorDetails = {
            id: advisorId,
            fullname: `${profile.firstName} ${profile.lastName}`,
            photo: profile.photo
          };
        });
      },
      (error) => {
        console.error('Error fetching advisor details:', error);
      }
    );
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

  onSubmit() {
    let review: Review = {
      id: this.reviewId,
      farmerId: this.farmerApiService.getFarmerId(),
      advisorId: this.advisorDetails.advisorId,
      rating: this.rating,
      comment: this.comment
    };

    this.reviewApiService.update(this.reviewId, review).subscribe((response) => {
      this.snackBar.open('Reseña actualizada exitosamente 🤓', 'Cerrar', { duration: 2000 });
      window.history.back();
    }, (error) => {
      this.snackBar.open('Error al actualizar reseña 😓', 'Cerrar', { duration: 2000 });
      console.error('Error updating view-review:', error);
    });
  }

  goBack() {
    window.history.back();
  }

}
