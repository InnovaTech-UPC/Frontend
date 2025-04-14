import {Component, OnInit} from '@angular/core';
import {DatePipe, NgIf} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader, MatCardImage, MatCardTitle} from "@angular/material/card";
import {AppointmentApiService} from "../../services/appointment-api.service";
import {AdvisorApiService} from "../../../user/services/advisor-api.service";
import {ProfileApiService} from "../../../profile/services/profile-api.service";
import {Appointment} from "../../models/appointment.model";
import {ActivatedRoute, Router} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {UserApiService} from "../../../user/services/user-api.service";
import {FarmerApiService} from "../../../user/services/farmer-api.service";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {CancelDialogComponent} from "../cancel-dialog/cancel-dialog.component";
import {NotificationApiService} from "../../services/notification-api.service";
import {AvailableDateApiService} from "../../services/available-date-api.service";
import {AvailableDate} from "../../models/available_date.model";
import {Notification} from "../../models/notification.model";
import {MatSnackBar} from "@angular/material/snack-bar";

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
    advisorId: 0,
    farmerId: 0,
    scheduledDate: '',
    status: '',
    startTime: '',
    endTime: '',
    meetingUrl: '',
    message: ''
  };
  profileInfo = {
    fullname: '',
    photo: ''
  };
  isFarmer = false;
  userId = 0;

  constructor(private appointmentApiService: AppointmentApiService,
              private advisorApiService: AdvisorApiService,
              private farmerApiService: FarmerApiService,
              private profileApiService: ProfileApiService,
              private userApiService: UserApiService,
              private notificationApiService: NotificationApiService,
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
        this.advisorApiService.getOne(appointment.advisorId).subscribe((advisor) => {
          this.profileApiService.getProfileByUserId(advisor.userId).subscribe((profile) => {
            this.profileInfo.fullname = profile.firstName + ' ' + profile.lastName;
            this.profileInfo.photo = profile.photo;
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
        let availableDate: AvailableDate = {
          id: 0,
          advisorId: this.appointment.advisorId,
          availableDate: this.appointment.scheduledDate,
          startTime: this.appointment.startTime,
          endTime: this.appointment.endTime,
        };
        this.availableDateApiService.create(availableDate).subscribe({
          next: () => {
            let notification: Notification;
            this.profileApiService.getProfileByUserId(this.userId).subscribe({
              next: (profile) => {
                let name = profile.firstName + ' ' + profile.lastName;
                if (this.isFarmer) {
                  // se notifica al asesor
                  this.advisorApiService.getOne(this.appointment.advisorId).subscribe({
                    next: (advisor) => {
                      notification = {
                        id: 0,
                        userId: advisor.userId,
                        title: `Cita cancelada por ${name}`,
                        message: `La cita programada para el ${this.appointment.scheduledDate} a las ${this.appointment.startTime} ha sido cancelada. Motivo: ${reason}`,
                        sendAt: new Date().toISOString()
                      };
                      this.notificationApiService.create(notification).subscribe({
                        next: () => {
                          this.snackBar.open('Cita cancelada correctamente 👍', 'Cerrar', {
                            duration: 3000,
                          });
                          this.router.navigate(['/granjero/citas']);
                        },
                        error: (error) => {
                          this.snackBar.open('Error al cancelar la cita 🤐', 'Cerrar', {
                            duration: 3000,
                          });
                          console.error('Error sending notification:', error);
                        }
                      });
                    }, error: error => {
                      console.error('Error fetching advisor:', error);
                    }
                  })
                } else {
                  // se notifica al granjero
                  this.farmerApiService.getOne(this.appointment.farmerId).subscribe({
                    next: (farmer) => {
                      notification = {
                        id: 0,
                        userId: farmer.userId,
                        title: `Cita cancelada por ${name}`,
                        message: `La cita programada para el ${this.appointment.scheduledDate} a las ${this.appointment.startTime} ha sido cancelada. Motivo: ${reason}`,
                        sendAt: new Date().toISOString()
                      };
                      this.notificationApiService.create(notification).subscribe({
                        next: () => {
                          this.snackBar.open('Cita cancelada correctamente 👍', 'Cerrar', {
                            duration: 3000,
                          });
                          this.router.navigate(['/asesor/citas']);
                        },
                        error: (error) => {
                          this.snackBar.open('Error al cancelar la cita 🤐', 'Cerrar', {
                            duration: 3000,
                          });
                          console.error('Error sending notification:', error);
                        }
                      });
                    }, error: error => {
                      console.error('Error fetching farmer:', error);
                    }
                  })

                }
              },
              error: (error) => {
                console.error('Error fetching profile:', error);
              }
            })
          }
        });
        console.log('Appointment canceled with reason:', reason);
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
