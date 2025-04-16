import {Component, ViewChild} from '@angular/core';
import {FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {Enclosure} from "../../models/enclosure.model";
import {ActivatedRoute, Router} from "@angular/router";
import {EnclosureApiService} from "../../services/enclosure-api.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-enclosure-editor',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './enclosure-editor.component.html',
  styleUrl: './enclosure-editor.component.css'
})
export class EnclosureEditorComponent {
  enclosureID = 0;
  enclosure: Enclosure = {
    id: 0,
    farmerId: 0,
    name: '',
    capacity: 0,
    type: ''
  }
  @ViewChild('enclosureForm', {static: false})
  enclosureForm! : NgForm;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private enclosureApiService: EnclosureApiService,
              private snackBar: MatSnackBar) {  }

  ngOnInit() {
    this.enclosureID = +this.route.snapshot.paramMap.get('id')!;
    this.getEnclosure(this.enclosureID);
  }

  getEnclosure(id: number){
    this.enclosureApiService.getOne(id).subscribe((data) => {
      this.enclosure = {
        id: data.id,
        farmerId: data.farmerId,
        name: data.name,
        capacity: data.capacity,
        type: data.type
      }
    });
  }

  onSubmit(){
    if(this.enclosureForm.form.valid){
      this.enclosureApiService.update(this.enclosure.id, this.enclosure)
        .subscribe(() => {
          this.snackBar.open('Recinto actualizado 🎉', 'Cerrar', { duration: 2000 });
          this.router.navigate(['/granjero/mi-granja']);
        }, error => {
          console.error('Error updating enclosure:', error);
          this.snackBar.open('Error al actualizar el recinto', 'Cerrar', { duration: 2000 });
        });
    }
  }

  goBack(){
    window.history.back();
  }

}
