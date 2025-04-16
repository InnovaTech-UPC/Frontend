import { Component } from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Animal} from "../../models/animal.model";
import {MatDialog} from "@angular/material/dialog";
import {AnimalApiService} from "../../services/animal-api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {DialogComponent} from "../../../public/components/dialog/dialog.component";
import {FarmerApiService} from "../../../profile/services/farmer-api.service";
import {EnclosureApiService} from "../../services/enclosure-api.service";

@Component({
  selector: 'app-register-animal',
  standalone: true,
  imports: [
    MatButton,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
    FormsModule,
    MatIconButton
  ],
  templateUrl: './register-animal.component.html',
  styleUrl: './register-animal.component.css'
})
export class RegisterAnimalComponent {

  animal: Animal = {
    id: 0,
    name: "",
    age: 0,
    species: "",
    breed: "",
    gender: false,
    weight: 0.1,
    health: "",
    enclosureId: 0
  };

  gender = "";

  constructor(public dialog: MatDialog,
              private animalApiService: AnimalApiService,
              private snackBar: MatSnackBar,
              private farmerApiService: FarmerApiService,
              private enclosureApiService: EnclosureApiService,
              private route: ActivatedRoute,
              private router: Router) {
    this.animal.enclosureId = +this.route.snapshot.paramMap.get('id')!;
  }

  handleClick(): void {
    if (!this.animal.name || !this.animal.species || !this.animal.breed || !this.animal.enclosureId ||
      !this.animal.weight || !this.animal.age || !this.animal.health || !this.gender) {
      this.snackBar.open('Por favor, completa todos los campos 🤐', 'Cerrar', {
        duration: 2000,
      });
    } else {
      // verify if cageId exists for this breeder
      this.enclosureApiService.getEnclosuresByFarmerId(this.farmerApiService.getFarmerId()).subscribe({
        next: (cages) => {
          if (!cages.some(cage => cage.id === this.animal.enclosureId)) {
            this.snackBar.open('El número de jaula no existe', 'Cerrar', {
              duration: 2000,
            });
          } else {
            this.animal.gender = this.gender === "true"; // required to convert the value to a boolean instead of a string
            this.registerAnimal();
          }
        }, error: error => {
          this.snackBar.open('Error al verificar el recinto', 'Cerrar', {
            duration: 2000,
          });
        }
      });
    }
  }

  registerAnimal(): void {
    this.animalApiService.create(this.animal).subscribe({
      next: () => {
        this.snackBar.open('Animal registrado con éxito🤠', 'Cerrar', {
          duration: 2000,
        });
        this.goBack();

      }, error: error => {
        this.snackBar.open('Error al registrar animal😥', 'Cerrar', {
          duration: 2000
        });
      }
    });
  }

  goBack() {
    window.history.back();
  }

}
