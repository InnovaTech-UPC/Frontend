import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

//Import the breeder model
import {Farmer} from "../models/farmer.model";
import {BaseService} from "../../shared/services/base.service";
import {catchError, Observable} from "rxjs";
import {Appointment} from "../../appointment/models/appointment.model";

@Injectable({
  providedIn: 'root'
})
export class FarmerApiService extends  BaseService<Farmer>{
  constructor(http: HttpClient) {
    super(http);
    this.extraUrl = environment.farmerURL;
  }

  setFarmerId(farmerId: number) {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('farmer_id', farmerId.toString());
    }
  }

  getFarmerId(): number {
    if (typeof window !== 'undefined' && window.localStorage) {
      const farmerId = localStorage.getItem('farmer_id');
      return farmerId ? parseInt(farmerId) : 0;
    }
    return 0;
  }

  getFarmerByUserId(userId: number) {
    this.setToken();
    return this.http.get<Farmer>(`${this.buildPath()}/${userId}/user`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

}
