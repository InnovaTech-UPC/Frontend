import {Component, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {EnclosureApiService} from "../../services/enclosure-api.service";
import {AnimalApiService} from "../../services/animal-api.service";
import {FarmerApiService} from "../../../profile/services/farmer-api.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Enclosure} from "../../models/enclosure.model";
import {Observable} from "rxjs";
import {
  ConfirmationDialogComponent
} from "../../../public/components/confirmation-dialog/confirmation-dialog.component";
import {EnclosureTableComponent} from "../../components/enclosure-table/enclosure-table.component";

@Component({
  selector: 'app-enclosure-list',
  standalone: true,
  imports: [
    MatButton,
    MatIcon,
    NgIf,
    RouterLink,
    EnclosureTableComponent
  ],
  templateUrl: './enclosure-list.component.html',
  styleUrl: './enclosure-list.component.css'
})
export class EnclosureListComponent implements OnInit {
  length: number = 0;
  dataSource!: MatTableDataSource<any>;
  constructor(private enclosureApiService: EnclosureApiService,
              private animalApiService: AnimalApiService,
              private farmerApiService: FarmerApiService,
              private router: Router,
              private dialog: MatDialog,
              private snackBar: MatSnackBar
  ) {  }

  ngOnInit() {
    this.getCages();
  }

  getCages(){
    this.enclosureApiService.getEnclosuresByFarmerId(this.farmerApiService.getFarmerId()).subscribe({
      next: (enclosures: Enclosure[]) => {
        this.dataSource = new MatTableDataSource(enclosures);
        this.length = enclosures.length;
      }, error: error => {
        console.error('Error fetching enclosures', error);
      }
    });
  }

  editEnclosure(id: number){
    this.router.navigate([`granjero/mi-granja/recinto/${id}/editar`]);
  }

  deleteEnclosure(id: number){
    this.enclosureApiService.getOne(id).subscribe({
      next: (enclosure: Enclosure) => {
        this.confirmDeletion(enclosure.name).subscribe(result => {
          if (result) {
            this.enclosureApiService.delete(id).subscribe({
              next: () => {
                this.getCages();
                this.snackBar.open('Recinto eliminado con exito 🎉', 'Cerrar', {
                  duration: 2000
                });
              }, error: error => {
                console.error('Error deleting cage', error);
                this.snackBar.open('Error al eliminar el recinto😥', 'Cerrar', {
                  duration: 2000
                });
              }
            });
          }
          else{
            console.log(`Cancel delete cage ${id}`);
          }
        });

      },
      error: error => {
        console.error('Error fetching enclosure', error);
        this.snackBar.open('Error al obtener el recinto😥', 'Cerrar', {
          duration: 2000
        });
      }
    })
  }

  confirmDeletion(name: string): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,
      {data : {
          message: `¿Estas seguro de querer eliminar el recinto ${name}? Se eliminará la información de todos los animales que contiene.`
        }
      });
    return dialogRef.afterClosed();
  }

  goToEnclosure(id: number){
    this.router.navigate([`granjero/mi-granja/recinto/${id}`]);
  }

}
