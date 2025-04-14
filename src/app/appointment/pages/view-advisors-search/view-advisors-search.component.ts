import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {NgForOf} from "@angular/common";

import {Advisor} from "../../../user/models/advisor.model";
import {Profile} from "../../../profile/models/profile.model";
import {AdvisorApiService} from "../../../user/services/advisor-api.service";
import {ProfileApiService} from "../../../profile/services/profile-api.service";
import {forEach} from "lodash";


@Component({
  selector: 'app-view-advisors-search',
  standalone: true,
  imports: [
    MatCardModule, MatToolbarModule, MatFormFieldModule,
    MatButtonModule, MatInputModule, NgForOf, MatIcon
  ],
  templateUrl: './view-advisors-search.component.html',
  styleUrl: './view-advisors-search.component.css'
})
export class ViewAdvisorsSearchComponent implements OnInit{
  profiles: Profile[] = [];
  advisors: Advisor[] = [];
  constructor(
    private advisorApiService: AdvisorApiService,
    private profileApiService: ProfileApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAdvisors();
  }

  getAdvisors(){
    this.profileApiService.getAdvisors().subscribe(profiles => {
      this.profiles = profiles;
      forEach(this.profiles, (profile: Profile) => {
        this.advisorApiService.getAdvisorByUserId(profile.userId).subscribe(advisor => {
          this.advisors[profile.userId] = advisor;
        });
      });
    });
  }

  filter(event: Event){
    const inputElement = event.target as HTMLInputElement;
    const filteredValue = inputElement.value.replace(/[^a-zA-Z ]/g, '');

    if (filteredValue === '') {
      this.getAdvisors();
    } else {
      this.profileApiService.getAdvisors().subscribe(res => {
          this.profiles = res.filter(profile =>
            (profile.firstName + ' ' + profile.lastName).toLowerCase().startsWith(filteredValue.toLowerCase())
          );
        },
        error => {
          console.log(error);
        });
    }
  }

  navigateToAdvisorInfo(advisorId: number) {
    this.router.navigate([`granjero/asesor-info/${advisorId}`]);
  }
}
