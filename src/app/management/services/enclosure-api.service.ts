import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {Enclosure} from "../models/enclosure.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EnclosureApiService extends BaseService<Enclosure> {
  constructor(http: HttpClient) {
    super(http);
    this.extraUrl = environment.enclosureURL;
  }

  getEnclosuresByFarmerId(farmerId: number){
    this.setToken();
    return this.http.get<Enclosure[]>(`${this.buildPath()}?farmerId=${farmerId}`, this.httpOptions).pipe(catchError(this.handleError));
  }
}
