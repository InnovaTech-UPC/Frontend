import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

import {BaseService} from "../../shared/services/base.service";
import {Profile} from "../models/profile.model";
import {catchError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfileApiService extends BaseService<Profile> {

  constructor(http: HttpClient) {
    super(http);
    this.extraUrl = environment.profileURL;
  }

  getProfileByUserId(userId: number) {
    this.setToken();
    return this.http.get<Profile>(this.buildPath() + '/' + userId + '/user', this.httpOptions).pipe(catchError(this.handleError));
  }

  getAdvisors() {
    this.setToken();
    return this.http.get<Profile[]>(this.buildPath() + '/advisors', this.httpOptions).pipe(catchError(this.handleError));
  }
}
