import {Component, OnInit} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {NgIf} from "@angular/common";
import {ProfileApiService} from "../../../profile/services/profile-api.service";
import {AppointmentApiService} from "../../services/appointment-api.service";
import {ReviewApiService} from "../../services/review-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AdvisorApiService} from "../../../user/services/advisor-api.service";
import {Advisor} from "../../../user/models/advisor.model";

@Component({
  selector: 'app-advisor-detail',
  standalone: true,
  imports: [
    MatButton,
    MatIcon,
    MatIconButton,
    NgIf
  ],
  templateUrl: './advisor-detail.component.html',
  styleUrl: './advisor-detail.component.css'
})
export class AdvisorDetailComponent implements OnInit {

  constructor(private advisorApiService: AdvisorApiService,
              private profileApiService: ProfileApiService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  profileInfo = {
    advisorId: 0,
    fullname: "",
    photo: "",
    description: "",
    occupation: "",
    experience: 0,
    rating: 0,
  };


  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.profileInfo.advisorId = params['id'];
      this.getAdvisorProfile();
    });
  }

  getAdvisorProfile() {
    this.advisorApiService.getOne(this.profileInfo.advisorId).subscribe(advisor => {
      this.profileInfo.rating = advisor.rating;
      this.profileApiService.getProfileByUserId(advisor.userId).subscribe(profile => {
        this.profileInfo.fullname = profile.firstName + " " + profile.lastName;
        this.profileInfo.photo = profile.photo;
        this.profileInfo.description = profile.description;
        this.profileInfo.occupation = profile.occupation;
        this.profileInfo.experience = profile.experience;
      }, error => {
        console.error('Error fetching profile:', error);
      });
    }, error => {
      console.error('Error fetching advisor profile:', error);
    });
  }

  goToReviews() {
    this.router.navigate([`/granjero/asesor-resenas/${this.profileInfo.advisorId}`]);
  }

  goToReserveAppointment() {
    this.router.navigate([`/granjero/asesor-info/${this.profileInfo.advisorId}/reservar-cita`]);
  }

  goBack() {
    window.history.back();
  }

}
