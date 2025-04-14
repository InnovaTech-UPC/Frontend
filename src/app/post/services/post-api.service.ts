import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {Post} from "../models/post.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class PostApiService extends BaseService<Post> {
  constructor(http: HttpClient) {
    super(http);
    this.extraUrl = environment.postURL;
  }

  getPostsByAdvisorId(advisorId: number) {
    this.setToken();
    return this.http.get<Post[]>(`${this.buildPath()}?advisorId=${advisorId}`, this.httpOptions).pipe(catchError(this.handleError));
  }
}
