import {Component, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {ActivatedRoute, Router} from "@angular/router";
import {AdvisorApiService} from "../../../profile/services/advisor-api.service";
import {FarmerApiService} from "../../../profile/services/farmer-api.service";
import {AppointmentApiService} from "../../services/appointment-api.service";
import {AvailableDateApiService} from "../../services/available-date-api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Advisor} from "../../../profile/models/advisor.model";
import {AvailableDate} from "../../models/available_date.model";
import {Farmer} from "../../../profile/models/farmer.model";
import {Appointment} from "../../models/appointment.model";
import {CommonModule, NgIf} from "@angular/common";
import {MatError, MatFormField} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ProfileApiService} from "../../../profile/services/profile-api.service";

@Component({
  selector: 'app-book-appointment',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    NgIf,
    MatFormField,
    MatSelect,
    MatOption,
    MatButton,
    MatLabel,
    CommonModule,
    MatInput,
    MatError,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './book-appointment.component.html',
  styleUrl: './book-appointment.component.css'
})
export class BookAppointmentComponent implements OnInit {
  appointmentForm: FormGroup = new FormGroup(
    {
      message: new FormControl('', [Validators.required])
    }
  );
  availableDates: AvailableDate[] = [];
  farmerId = 0;
  advisorId = 0;
  selectedDateIndex: number = 0;
  profileInfo = {
    fullname: '',
    photo: ''
  };

  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private advisorApiService: AdvisorApiService,
    private profileApiService: ProfileApiService,
    private farmerApiService: FarmerApiService,
    private appointmentApiService: AppointmentApiService,
    private availableDateApiService: AvailableDateApiService,
    private snackBar: MatSnackBar
  ){}


  ngOnInit() {
    this.farmerId = this.farmerApiService.getFarmerId();
    this.getAdvisor();
  }

  getAdvisor(): void {
    this.advisorId = this.activatedRouter.snapshot.params['id'];
    this.advisorApiService.getOne(this.advisorId).subscribe((advisor) => {
      this.profileApiService.getProfileByUserId(advisor.userId).subscribe((profile) => {
        this.profileInfo.fullname = profile.firstName + ' ' + profile.lastName;
        this.profileInfo.photo = profile.photo;
      });
    });
    this.getAdvisorAvailableDates(this.advisorId); //called after getting advisor
  }

  getAdvisorAvailableDates(advisorId: number) {
    this.availableDateApiService.getAvailableDatesByAdvisorId(advisorId).subscribe({
      next: dates => {
      this.availableDates = dates.sort((a, b) => {
        const dateA = new Date(a.scheduledDate).getTime();
        const dateB = new Date(b.scheduledDate).getTime();
        if (dateA === dateB) {
          const timeA = new Date(`1970-01-01T${a.startTime}`).getTime();
          const timeB = new Date(`1970-01-01T${b.startTime}`).getTime();
          return timeA - timeB; // Sort by startTime if dates are equal
        }
        return dateA - dateB; // Ascending order
      });
      }, error: error => {
        console.log('Error fetching available dates:', error);
    }});
  }

  createAppointment(): void {
    let selectedDate = this.availableDates[this.selectedDateIndex];
    let newAppointment: Appointment = {
      id: 0,
      farmerId: this.farmerId,
      availableDateId: selectedDate.id,
      status: "PENDING",
      message: this.appointmentForm.value.message,
    };

    this.appointmentApiService.create(newAppointment).subscribe({
      next:
      () => {
        this.snackBar.open('Cita reservada🤩', 'Cerrar', {
          duration: 2000
        });
        this.router.navigate(['/granjero/citas']);
        },
      error: error => {
        this.snackBar.open('Error al reservar la cita😥', 'Cerrar', {
          duration: 2000
        });
        console.log('Error creating appointment:', error);
      }});
  }

  goBack() {
    window.history.back();
  }
}
