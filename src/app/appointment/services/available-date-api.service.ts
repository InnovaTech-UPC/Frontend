import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";


//Import the BaseService
import {BaseService} from "../../shared/services/base.service";
import {AvailableDate} from "../models/available_date.model";
import {catchError, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AvailableDateApiService extends BaseService<AvailableDate>{
  constructor(http: HttpClient) {
    super(http);
    this.extraUrl = environment.availableDateURL;
  }

  getAvailableDatesByAdvisorId(advisorId: number): Observable<AvailableDate[]> {
    this.setToken();
    return this.http.get<AvailableDate[]>(`${this.buildPath()}?advisorId=${advisorId}`, this.httpOptions).pipe(catchError(this.handleError));
  }
}
