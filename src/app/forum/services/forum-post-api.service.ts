import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {ForumPost} from "../models/forum_post.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ForumPostApiService extends BaseService<ForumPost> {

  constructor(http: HttpClient) {
    super(http);
    this.extraUrl = environment.forumPostURL;
  }

  getForumPostsByUserId(userId: number): Observable<ForumPost[]> {
    this.setToken();
    return this.http.get<ForumPost[]>(
      `${this.buildPath()}/${userId}`,
      this.httpOptions
    ).pipe(catchError(this.handleError));
  }
}
