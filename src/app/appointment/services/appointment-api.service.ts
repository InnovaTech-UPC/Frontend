import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

import {Appointment} from "../models/appointment.model";
//Import the BaseService
import {BaseService} from "../../shared/services/base.service";
import {catchError} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AppointmentApiService extends BaseService<Appointment>{
  constructor(http: HttpClient) {
    super(http);
    this.extraUrl = environment.appointmentURL;
  }

  getAppointmentsByFarmerId(farmerId: number) {
    this.setToken();
    return this.http.get<Appointment[]>(`${this.buildPath()}?farmerId=${farmerId}`, this.httpOptions).pipe(catchError(this.handleError));
  }

  getAppointmentsByAdvisorId(advisorId: number) {
    this.setToken();
    return this.http.get<Appointment[]>(`${this.buildPath()}?advisorId=${advisorId}`, this.httpOptions).pipe(catchError(this.handleError));
  }

  getAppointmentsByFarmerIdAndAdvisorId(farmerId: number, advisorId: number) {
    this.setToken();
    return this.http.get<Appointment[]>(`${this.buildPath()}?farmerId=${farmerId}&advisorId=${advisorId}`, this.httpOptions).pipe(catchError(this.handleError));
  }

}
