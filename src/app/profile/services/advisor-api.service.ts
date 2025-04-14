import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

import {Advisor} from "../models/advisor.model";
import {BaseService} from "../../shared/services/base.service";
import {catchError} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AdvisorApiService extends  BaseService<Advisor>{
  constructor(http: HttpClient) {
    super(http);
    this.extraUrl = environment.advisorURL;
  }

  setAdvisorId(advisor_id: number) {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('advisor_id', advisor_id.toString());
    }
  }

  getAdvisorId(): number {
    if (typeof window !== 'undefined' && window.localStorage) {
      const advisor_id = localStorage.getItem('advisor_id');
      return advisor_id ? parseInt(advisor_id) : 0;
    }
    return 0;
  }

  getAdvisorByUserId(userId: number) {
    this.setToken();
    return this.http.get<Advisor>(`${this.buildPath()}/${userId}/user`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

}
