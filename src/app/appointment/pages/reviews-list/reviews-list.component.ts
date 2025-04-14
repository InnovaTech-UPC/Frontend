import {Component, OnInit} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {ReviewApiService} from "../../services/review-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AdvisorApiService} from "../../../user/services/advisor-api.service";
import {ProfileApiService} from "../../../profile/services/profile-api.service";
import {Review} from "../../models/review.model";
import {FarmerApiService} from "../../../user/services/farmer-api.service";
import {NgForOf, NgIf} from "@angular/common";
import {
  MatCard,
  MatCardAvatar,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";

@Component({
  selector: 'app-reviews-list',
  standalone: true,
  imports: [
    MatButton,
    MatIcon,
    MatIconButton,
    NgForOf,
    MatCard,
    MatCardAvatar,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    NgIf
  ],
  templateUrl: './reviews-list.component.html',
  styleUrl: './reviews-list.component.css'
})
export class ReviewsListComponent implements OnInit {

  profileInfo = {
    advisorId: 0,
    fullname: '',
    photo: '',
    rating: 0
  };

  reviews: Review[] = [];

  farmerInfo: any = {
    fullname: '',
    photo: '',
  };

  constructor(private route: ActivatedRoute,
              private router: Router,
              private advisorApiService: AdvisorApiService,
              private profileApiService: ProfileApiService,
              private farmerApiService: FarmerApiService,
              private reviewApiService: ReviewApiService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.profileInfo.advisorId = params['id'];
      this.getAdvisorInfo(this.profileInfo.advisorId);
      this.getReviews(this.profileInfo.advisorId);
    });
  }

  getAdvisorInfo(advisorId: number) {
    this.advisorApiService.getOne(advisorId).subscribe(
      (advisor) => {
        this.profileApiService.getProfileByUserId(advisor.userId).subscribe(
          (profile) => {
            this.profileInfo.fullname = profile.firstName + ' ' + profile.lastName;
            this.profileInfo.photo = profile.photo;
            this.profileInfo.rating = advisor.rating;
          },
          (error) => {
            console.error('Error fetching profile info:', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching advisor info:', error);
      }
    );
  }

  getFarmersInfo(farmerId: number) {
    this.farmerApiService.getOne(farmerId).subscribe(
      (farmer) => {
        this.profileApiService.getProfileByUserId(farmer.userId).subscribe(
          (profile) => {
            this.farmerInfo[farmer.id] = {
              fullname: profile.firstName + ' ' + profile.lastName,
              photo: profile.photo,
            };
          },
          (error) => {
            console.error('Error fetching profile info:', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching farmer info:', error);
      }
    );
  }

  getReviews(advisorId: number) {
    this.reviewApiService.getReviewsByAdvisorId(advisorId).subscribe(
      (reviews) => {
        this.reviews = reviews;
        this.reviews.forEach(review => {
          this.getFarmersInfo(review.farmerId);
        });
      },
      (error) => {
        console.error('Error fetching reviews:', error);
      }
    );
  }

  goBack() {
    window.history.back();
  }

}
