import {Component, OnInit} from '@angular/core';
import {DatePipe, NgIf} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader, MatCardImage, MatCardTitle} from "@angular/material/card";
import {AppointmentApiService} from "../../services/appointment-api.service";
import {AdvisorApiService} from "../../../profile/services/advisor-api.service";
import {ProfileApiService} from "../../../profile/services/profile-api.service";
import {Appointment} from "../../models/appointment.model";
import {ActivatedRoute, Router} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {UserApiService} from "../../../profile/services/user-api.service";
import {FarmerApiService} from "../../../profile/services/farmer-api.service";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {CancelDialogComponent} from "../cancel-dialog/cancel-dialog.component";
import {AvailableDateApiService} from "../../services/available-date-api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AvailableDate} from "../../models/available_date.model";

@Component({
  selector: 'app-appointment-detail',
  standalone: true,
  imports: [
    DatePipe,
    MatButton,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardImage,
    MatCardTitle,
    MatIconButton,
    MatIcon,
    MatDialogModule,
    NgIf
  ],
  templateUrl: './appointment-detail.component.html',
  styleUrl: './appointment-detail.component.css'
})
export class AppointmentDetailComponent implements OnInit {

  appointmentId = 0;
  appointment: Appointment = {
    id: 0,
    farmerId: 0,
    availableDateId: 0,
    status: '',
    meetingUrl: '',
    message: ''
  };
  profileInfo = {
    fullname: '',
    photo: ''
  };
  availableDate: AvailableDate = {
    id: 0,
    scheduledDate: '',
    startTime: '',
    endTime: '',
    advisorId: 0,
    status: ''
  };

  isFarmer = false;
  userId = 0;

  constructor(private appointmentApiService: AppointmentApiService,
              private advisorApiService: AdvisorApiService,
              private farmerApiService: FarmerApiService,
              private profileApiService: ProfileApiService,
              private userApiService: UserApiService,
              private availableDateApiService: AvailableDateApiService,
              private dialog: MatDialog,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private snackBar: MatSnackBar) {
  }

  async ngOnInit() {
    this.isFarmer = this.userApiService.getIsFarmer();
    this.userId = this.userApiService.getUserId();
    this.appointmentId = this.activatedRoute.snapshot.params['id'];
    this.getAppointment();
  }

  getAppointment() {
    if (this.isFarmer) {
      this.appointmentApiService.getOne(this.appointmentId).subscribe((appointment) => {
        this.appointment = appointment;
        this.availableDateApiService.getOne(appointment.availableDateId).subscribe((availableDate) => {
          this.availableDate = availableDate;
          this.advisorApiService.getOne(availableDate.advisorId).subscribe((advisor) => {
            this.profileApiService.getProfileByUserId(advisor.userId).subscribe((profile) => {
              this.profileInfo.fullname = profile.firstName + ' ' + profile.lastName;
              this.profileInfo.photo = profile.photo;
            });
          });
        });
      });
    } else {
      this.appointmentApiService.getOne(this.appointmentId).subscribe((appointment) => {
        this.appointment = appointment;
        this.farmerApiService.getOne(appointment.farmerId).subscribe((farmer) => {
          this.profileApiService.getProfileByUserId(farmer.userId).subscribe((profile) => {
            this.profileInfo.fullname = profile.firstName + ' ' + profile.lastName;
            this.profileInfo.photo = profile.photo;
          });
          this.availableDateApiService.getOne(appointment.availableDateId).subscribe((availableDate) => {
            this.availableDate = availableDate;
          });
        });
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

  openCancelDialog(): void {
    const dialogRef = this.dialog.open(CancelDialogComponent, {
      width: '400px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((reason: string) => {
      if (reason) {
        console.log('Cancellation reason:', reason);
        // Call API to cancel the appointment with the reason
        this.cancelAppointment(reason);
      }
    });
  }

  cancelAppointment(reason: string): void {
    this.appointmentApiService.delete(this.appointmentId).subscribe({
      next: () => {
        this.snackBar.open('Cita cancelada con éxito', 'Cerrar', {
          duration: 2000
        });
        this.router.navigate(['/granjero/citas']);
      },
      error: (error) => {
        console.error('Error canceling appointment:', error);
      }
    })
  }

  goBack() {
    window.history.back();
  }

}
