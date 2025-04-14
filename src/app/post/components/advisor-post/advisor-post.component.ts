import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../models/post.model";
import {Router} from "@angular/router";
import {ProfileApiService} from "../../../profile/services/profile-api.service";
import {AdvisorApiService} from "../../../user/services/advisor-api.service";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardTitle
} from "@angular/material/card";
import {MatButton} from "@angular/material/button";


@Component({
  selector: 'advisor-post',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardImage,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    MatButton
  ],
  templateUrl: './advisor-post.component.html',
  styleUrl: './advisor-post.component.css'
})
export class AdvisorPostComponent implements OnInit {
  @Input() post: Post = {
    id: 0,
    advisorId: 0,
    title: '',
    description: '',
    image: ''
  }
  constructor(
    private router: Router,
    private profileApiService: ProfileApiService,
    private advisorApiService: AdvisorApiService,
  ) {
  }

  name: string = '';
  image: string = '';

  ngOnInit() {
    this.advisorApiService.getOne(this.post.advisorId).subscribe({
      next: (advisor) => {
        this.profileApiService.getProfileByUserId(advisor.id).subscribe({
          next: (profile) => {
            this.name = profile.firstName + ' ' + profile.lastName;
            this.image = profile.photo;
          },
          error: (error) => {
            console.error('Error fetching profile:', error);
          }
        })
      },
      error: (error) => {
        console.error('Error fetching advisor:', error);
      }
    })
  }

  goToAdvisor(id: number) {
    this.router.navigate(['/granjero/asesor-info', id]);
  }
}
