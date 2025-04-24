import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";


//Import the BaseService
import {BaseService} from "../../shared/services/base.service";
import {Animal} from "../models/animal.model";
import {catchError} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class AnimalApiService extends BaseService<Animal>{
  constructor(http: HttpClient) {
    super(http);
    this.extraUrl = environment.animalURL;
  }

  getAnimalsByEnclosureId(enclosureId: number) {
    this.setToken();
    return this.http.get<Animal[]>(`${this.buildPath()}?enclosureId=${enclosureId}`, this.httpOptions).pipe(catchError(this.handleError));
  }
}
