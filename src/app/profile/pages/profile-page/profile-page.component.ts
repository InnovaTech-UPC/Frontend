import {Component, OnInit} from '@angular/core';
import {UserApiService} from "../../services/user-api.service";
import {NgIf} from "@angular/common";
import {FarmerProfileComponent} from "../../components/farmer-profile/farmer-profile.component";
import {AdvisorProfileComponent} from "../../components/advisor-profile/advisor-profile.component";

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    NgIf,
    FarmerProfileComponent,
    AdvisorProfileComponent
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent implements OnInit {

  isFarmer: boolean = false;

  constructor(private userApiService: UserApiService) {
  }


  ngOnInit() {
    this.isFarmer = this.userApiService.getIsFarmer();
  }
}
