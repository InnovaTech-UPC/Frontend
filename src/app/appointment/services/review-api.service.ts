import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

import {Review} from "../models/review.model";
//Import the BaseService
import {BaseService} from "../../shared/services/base.service";
import {catchError} from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class ReviewApiService extends BaseService<Review>{
  constructor(http: HttpClient) {
    super(http);
    this.extraUrl = environment.reviewURL;
  }

  getReviewByAdvisorIdAndFarmerId(advisorId: number, farmerId: number) {
    this.setToken();
    return this.http.get<Review[]>(`${this.buildPath()}?advisorId=${advisorId}&farmerId=${farmerId}`, this.httpOptions).pipe(catchError(this.handleError));
  }

  getReviewsByAdvisorId(advisorId: number) {
    this.setToken();
    return this.http.get<Review[]>(`${this.buildPath()}?advisorId=${advisorId}`, this.httpOptions).pipe(catchError(this.handleError));
  }

}
