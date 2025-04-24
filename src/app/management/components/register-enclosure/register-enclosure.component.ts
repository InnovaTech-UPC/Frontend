import { Component } from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Enclosure} from "../../models/enclosure.model";
import {EnclosureApiService} from "../../services/enclosure-api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FarmerApiService} from "../../../profile/services/farmer-api.service";
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-register-enclosure',
  standalone: true,
  imports: [
    MatButton,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    FormsModule,
    MatIconButton,
    MatError,
    NgIf
  ],
  templateUrl: './register-enclosure.component.html',
  styleUrl: './register-enclosure.component.css'
})
export class RegisterEnclosureComponent {

  enclosure: Enclosure = {
    id: 0,
    farmerId: 0,
    name: '',
    capacity: 1,
    type: ''
  };

  constructor(private enclosureApiService: EnclosureApiService,
              private snackBar: MatSnackBar,
              private farmerApiService: FarmerApiService,
              private router: Router) {
    this.enclosure.farmerId = this.farmerApiService.getFarmerId();
  }


  handleClick(): void {
    if (!this.enclosure.name || !this.enclosure.capacity || !this.enclosure.type) {
      this.snackBar.open('Por favor, completa todos los campos😓', 'Cerrar', {
        duration: 2000,
      });
    } else {
      this.registerEnclosure();
    }
  }

  registerEnclosure(): void {
    this.enclosureApiService.create(this.enclosure).subscribe(() => {
      this.snackBar.open('Recinto registrado con éxito🤓', 'Cerrar', {
        duration: 2000,
      });
      this.router.navigate(['/granjero/mi-granja']);
    }, error => {
      this.snackBar.open('Error al registrar recinto😔', 'Cerrar', {
        duration: 2000
      });
    });
  }
  goBack() {
    window.history.back();
  }

}
