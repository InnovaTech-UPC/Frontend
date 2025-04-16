import {Component, OnInit, ViewChild} from '@angular/core';
import {FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {Animal} from "../../models/animal.model";
import {ActivatedRoute, Router} from "@angular/router";
import {AnimalApiService} from "../../services/animal-api.service";
import {Observable} from "rxjs";
import {NgIf} from "@angular/common";

import {ConfirmationDialogComponent} from "../../../public/components/confirmation-dialog/confirmation-dialog.component";

import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatIcon} from "@angular/material/icon";
import {MatOption, MatSelect} from "@angular/material/select";
import {FarmerApiService} from "../../../profile/services/farmer-api.service";
import {EnclosureApiService} from "../../services/enclosure-api.service";

@Component({
  selector: 'app-animal-information',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatCheckbox,
    MatIcon,
    MatSelect,
    MatOption,
    NgIf
  ],
  templateUrl: './animal-information.component.html',
  styleUrl: './animal-information.component.css'
})
export class AnimalInformationComponent implements OnInit{
  animalID: number = -1;
  isEditMode: boolean = false;
  animal: Animal = {
    id: 0,
    name: '',
    age: 0,
    species: '',
    breed: '',
    gender: true,
    weight: 0,
    health: '',
    enclosureId: 0,
  };
  gender!: string;
  originalAnimal!: Animal;

  @ViewChild('animalForm', {static: false})
  animalForm! : NgForm;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private animalApiService: AnimalApiService,
              private farmerApiService: FarmerApiService,
              private enclosureApiService: EnclosureApiService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.animalID = +this.route.snapshot.paramMap.get('animalId')!;
    this.getAnimal();
  }

  getAnimal() {
    this.animalApiService.getOne(this.animalID)
      .subscribe({
        next: (data) => {
          this.animal = data;
          this.gender = (this.animal.gender ? 'true': 'false');
          this.originalAnimal = {...this.animal};
        },
        error: (error) => {
          console.error(error);
        }
      })
  }

  onSubmit() {
    if (this.animalForm.valid) {
      this.enclosureApiService.getEnclosuresByFarmerId(this.farmerApiService.getFarmerId()).subscribe(
        enclosures => {
        if (!enclosures.some(enclosure => enclosure.id === this.animal.enclosureId)) {
          this.snackBar.open('El número de recinto no existe', 'Cerrar', {
            duration: 2000,
          });
        }
        else{
          this.animal.gender = this.gender === 'true';
          this.animalApiService.update(this.animalID, this.animal)
            .subscribe(
              (data) => {
                this.animal = data;
                this.originalAnimal = {...this.animal};
                this.isEditMode = false;
                this.snackBar.open('Información actualizada con éxito 🎉', 'Cerrar', {
                  duration: 2000
                });
              },
              (error) => {
                console.error(error);
              }
            )
        }
      });
    }
  }

  onCancel() {
    this.isEditMode = false;
    this.animal = {...this.originalAnimal};
  }

  editAnimal() {
    this.isEditMode = true;
  }

  deleteAnimal() {
    this.confirmMessage(`¿Estas seguro de querer eliminar la información del animal?`).subscribe(result => {
      if(result) {
        this.animalApiService.delete(this.animalID).subscribe(() => {
          this.router.navigate([`/granjero/mi-granja/recinto/${this.animal.enclosureId}`]);
          this.snackBar.open('Animal eliminado con éxito 🎉', '', {
            duration: 2000
          });
        }, error => {
          console.error(error);
          this.snackBar.open('Error al eliminar el animal', 'Cerrar', {
            duration: 2000,
          });
        });
      }
      else{
        console.log(`Cancel delete animal ${this.animalID}`);
      }
    });
  }

  confirmMessage(message: string): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,
      {data : {
          message: message
        }
      });
    return dialogRef.afterClosed();
  }

  goBack() {
    window.history.back();
  }
}
