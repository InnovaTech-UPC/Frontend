import {Component, OnInit} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatCard, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {NgForOf, NgIf} from "@angular/common";
import {Appointment} from "../../models/appointment.model";
import {FarmerApiService} from "../../../profile/services/farmer-api.service";
import {AdvisorApiService} from "../../../profile/services/advisor-api.service";
import {AppointmentApiService} from "../../services/appointment-api.service";
import {UserApiService} from "../../../profile/services/user-api.service";
import {ProfileApiService} from "../../../profile/services/profile-api.service";
import {Router} from "@angular/router";
import {forEach} from "lodash";
import {ReviewApiService} from "../../services/review-api.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-my-appointments-history',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatIcon,
    NgForOf,
    NgIf,
    MatIconButton
  ],
  templateUrl: './my-appointments-history.component.html',
  styleUrl: './my-appointments-history.component.css'
})
export class MyAppointmentsHistoryComponent implements OnInit {


  farmerId = 0;
  advisorId = 0;
  appointments: Appointment[] = [];
  profileDetails: any = {};
  isFarmer = false;

  constructor(
    private farmerApiService: FarmerApiService,
    private advisorApiService: AdvisorApiService,
    private appointmentApiService: AppointmentApiService,
    private userApiService: UserApiService,
    private profileApiService: ProfileApiService,
    private reviewApiService: ReviewApiService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isFarmer = this.userApiService.getIsFarmer();
    if (this.isFarmer)
      this.farmerId = this.farmerApiService.getFarmerId();
    else
      this.advisorId = this.advisorApiService.getAdvisorId();
    this.getMyAppointments();
  }

  getMyAppointments() {
    // Get all appointments for the farmer
    if (this.isFarmer) {
      this.appointmentApiService.getAppointmentsByFarmerId(this.farmerId).subscribe({
        next: appointments => {
          forEach(appointments, (appointment) => {
            if (appointment.status === 'COMPLETED' || appointment.status === 'REVIEWED') {
              this.appointments.push(appointment);
              this.advisorApiService.getOne(appointment.advisorId).subscribe(advisor => {
                this.profileApiService.getProfileByUserId(advisor.userId).subscribe(profile => {
                  this.profileDetails[advisor.id] = {
                    fullname: `${profile.firstName} ${profile.lastName}`,
                    photo: profile.photo
                  };
                }, error => {
                  console.error('Error fetching profile details:', error);
                });
              }, error => {
                console.error('Error fetching advisor details:', error);
              })
            }
          });
          this.sortAppointmentsByDate();
        }, error: error => {
          console.error('Error fetching appointments:', error);
        }
      });
    }
    else {
      // Get all appointments for the advisor
      this.appointmentApiService.getAppointmentsByAdvisorId(this.advisorId).subscribe({
        next: appointments => {
          forEach(appointments, (appointment) => {
            if (appointment.status === 'COMPLETED' || appointment.status === 'REVIEWED') {
              this.appointments.push(appointment);
              this.farmerApiService.getOne(appointment.farmerId).subscribe(farmer => {
                this.profileApiService.getProfileByUserId(farmer.userId).subscribe(profile => {
                  this.profileDetails[farmer.id] = {
                    fullname: `${profile.firstName} ${profile.lastName}`,
                    photo: profile.photo
                  };
                });
              })
            }
          });
          this.sortAppointmentsByDate();
        }, error: error => {
          console.error('Error fetching appointments:', error);
        }
      });
    }

  }

  formatDate(dateTime: string): string {
    const date = new Date(dateTime);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript comienzan desde 0
    // pasar a texto el mes
    const monthNames = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    const monthText = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${day} de ${monthText} de ${year}`;
  }

  goToReview(advisorId: number, farmerId: number): void {
    this.reviewApiService.getReviewByAdvisorIdAndFarmerId(advisorId, farmerId).subscribe((review) => {
      if (this.isFarmer)
        this.router.navigate([`/granjero/resena/${review[0].id}`]);
      else
        this.router.navigate([`/asesor/resena/${review[0].id}`]);
      }, (error) => {
      // no hay reseña
      console.log(error);
      if (this.isFarmer)
        this.router.navigate([`/granjero/resena-nueva/${advisorId}`]);
      else
        this.snackBar.open('El usuario aún no ha dejado una reseña 👀', 'Cerrar', { duration: 2000 });
      });
  }

  goBack() {
    window.history.back();
  }

  sortAppointmentsByDate(): void {
    this.appointments.sort((a, b) => {
      const dateA = new Date(a.scheduledDate).getTime();
      const dateB = new Date(b.scheduledDate).getTime();
      return dateA - dateB; // Ascending order
    });
  }

}
