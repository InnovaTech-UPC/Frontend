import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {AvailableDate} from "../../models/available_date.model";
import {MatCard, MatCardContent} from "@angular/material/card";
import {NgForOf, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatSnackBar} from "@angular/material/snack-bar";

import { AdvisorApiService } from "../../../profile/services/advisor-api.service";
import { AvailableDateApiService } from "../../services/available-date-api.service";
import {MatDialog} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {
  ConfirmationDialogComponent
} from "../../../public/components/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-list-availability-schedule',
  standalone: true,
    imports: [
        RouterLink,
        MatCard,
        MatCardContent,
        NgForOf,
        MatButton,
        NgIf
    ],
  templateUrl: './list-availability-schedule.component.html',
  styleUrl: './list-availability-schedule.component.css'
})
export class ListAvailabilityScheduleComponent implements OnInit{
  dates: AvailableDate[] = [];
  advisorId = 0;

  constructor(private availableDateApiService: AvailableDateApiService,
              private advisorApiService: AdvisorApiService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.advisorId = this.advisorApiService.getAdvisorId();
    this.getAvailableDates();
  }


  getAvailableDates() {
    this.availableDateApiService.getAvailableDatesByAdvisorId(this.advisorId).subscribe({
      next: (response) => {
        this.dates = response.sort((a, b) => {
          const dateA = new Date(`${a.scheduledDate}T${a.startTime}`);
          const dateB = new Date(`${b.scheduledDate}T${b.startTime}`);
          return dateA.getTime() - dateB.getTime();
        });
        console.log("Horarios disponibles obtenidos con éxito:", this.dates);
      },
      error: (error) => {
        console.error("Error al obtener los horarios disponibles:", error);
        this.snackBar.open("Error al obtener los horarios disponibles", "Cerrar", {
          duration: 2000,
        });
      }
    })
  }

  confirmDeletion(): Observable<boolean> {
    // Open a dialog to confirm the deletion
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: `¿Estás seguro de querer eliminar este horario? Los productores agrícolas ya no podrán visualizarla.`
      }
    });
    // Return the result of the dialog
    return dialogRef.afterClosed();
  }

  deleteDate(id: number) {
    this.confirmDeletion().subscribe(confirmado => {
      if (confirmado) {
        this.availableDateApiService.delete(id).subscribe(() => {
          console.log("Horario disponible eliminado con éxito.");
          this.snackBar.open("Horario disponible eliminado con éxito👍", "Cerrar", {
            duration: 2000,
          });
          this.dates = this.dates.filter((availableDate: any) => availableDate.id !== id);
        }, (error) => {
          console.error("Error al eliminar el horario disponible:", error);
          this.snackBar.open("Error al eliminar el horario disponible", "Cerrar", {
            duration: 2000,
          });
        });
      }
    })

  }

}
