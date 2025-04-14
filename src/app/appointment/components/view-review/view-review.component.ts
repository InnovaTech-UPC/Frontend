import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {Review} from "../../models/review.model";
import {ActivatedRoute, Router} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {NgForOf, NgIf} from "@angular/common";

import {Advisor} from "../../../profile/models/advisor.model";
import {Appointment} from "../../models/appointment.model";
import {AdvisorApiService} from "../../../profile/services/advisor-api.service";
import {AppointmentApiService} from "../../services/appointment-api.service";
import {ReviewApiService} from "../../services/review-api.service";
import {MatCardModule} from "@angular/material/card";
import {ProfileApiService} from "../../../profile/services/profile-api.service";
import {FarmerApiService} from "../../../profile/services/farmer-api.service";
import {UserApiService} from "../../../profile/services/user-api.service";

@Component({
  selector: 'app-view-review',
  standalone: true,
  imports: [
    FormsModule, MatButton, MatFormField, MatInput, MatLabel,
    ReactiveFormsModule, MatIcon, NgForOf, NgIf, MatCardModule, MatIconButton,
  ],
  templateUrl: './view-review.component.html',
  styleUrl: './view-review.component.css'
})
export class ViewReviewComponent implements OnInit {
  profileDetails: any = {
    fullname: "",
    photo: ""
  };
  rating: number = 0;
  stars: boolean[] = Array(5).fill(false);
  isFarmer: boolean = false;
  review: Review = {
    id: 0,
    farmerId: 0,
    advisorId: 0,
    comment: "",
    rating: 0
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private userApiService: UserApiService,
    private farmerApiService: FarmerApiService,
    private advisorApiService: AdvisorApiService,
    private profileApiService: ProfileApiService,
    private reviewApiService: ReviewApiService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.review.id = params['id'];
      this.isFarmer = this.userApiService.getIsFarmer();
      this.getReview();
    });
  }

  getReview() {
    this.reviewApiService.getOne(this.review.id).subscribe(review => {
      this.review = review;
      if (review.comment === "")
        this.review.comment = "Sin comentarios";
      if (this.isFarmer)
        this.getAdvisor(review.advisorId);
      else
        this.getFarmer(review.farmerId);
      for (let i = 0; i < review.rating; i++) {
        this.stars[i] = true;
      }
    });
  }

  getAdvisor(advisorId: number): void {
    this.advisorApiService.getOne(advisorId).subscribe(advisor => {
      this.profileApiService.getOne(advisor.userId).subscribe(profile => {
        this.profileDetails = {
          fullname: `${profile.firstName} ${profile.lastName}`,
          photo: profile.photo
        };
      });
    });
  }

  getFarmer(farmerId: number): void {
    this.farmerApiService.getOne(farmerId).subscribe(farmer => {
      this.profileApiService.getOne(farmer.userId).subscribe(profile => {
        this.profileDetails = {
          fullname: `${profile.firstName} ${profile.lastName}`,
          photo: profile.photo
        };
      });
    });
  }

  goToEditReview() {
    this.router.navigate([`/granjero/editar-resena/${this.review.id}`]);
  }

  goBack() {
    window.history.back();
  }


}
