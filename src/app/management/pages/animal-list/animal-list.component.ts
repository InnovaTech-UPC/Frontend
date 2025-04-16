import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {AnimalApiService} from "../../services/animal-api.service";
import {Animal} from "../../models/animal.model";
import {NgForOf, NgIf} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {AnimalCardComponent} from "../../components/animal-card/animal-card.component";
import {EnclosureApiService} from "../../services/enclosure-api.service";

@Component({
  selector: 'app-animal-list',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    MatButton,
    MatIcon,
    AnimalCardComponent,
    RouterLink,
    MatIconButton
  ],
  templateUrl: './animal-list.component.html',
  styleUrl: './animal-list.component.css'
})
export class AnimalListComponent implements OnInit{
  animals: Animal[] = [];

  enclosureID = -1;
  enclosureName = '';
  constructor(private router: Router,
              private route: ActivatedRoute,
              private enclosureApiService: EnclosureApiService,
              private animalApiService: AnimalApiService) {
  }

  ngOnInit() {
    this.enclosureID = +this.route.snapshot.paramMap.get('id')!;
    this.getAnimals();
  }

  getAnimals(){
    this.enclosureApiService.getOne(this.enclosureID).subscribe({
      next: (res) => {
        this.enclosureName = res.name;
      }, error: (error) => {
        console.error('Error fetching enclosure name:', error);
      }
    });
    this.animalApiService.getAnimalsByEnclosureId(this.enclosureID).subscribe({
      next: (animals: any) => {
        this.animals = animals;
      }, error: (error) => {
        console.error('Error fetching animals:', error);
      }
    });
  }

  createAnimal() {
    this.router.navigate([`granjero/mi-granja/recinto/${this.enclosureID}/nuevo-animal`]);
  }

  goBack() {
    window.history.back();
  }
}
