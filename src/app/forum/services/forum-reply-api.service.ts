import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {ForumReply} from "../models/forum_reply.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {ForumFavorite} from "../models/forum_favorite.model";
import {catchError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ForumReplyApiService extends BaseService<ForumReply> {

  constructor(http: HttpClient) {
    super(http);
    this.extraUrl = environment.forumReplyURL;
  }

  getRepliesByForumPostId(forumPostId: number) {
    this.setToken();
    return this.http.get<ForumReply[]>(this.buildPath() + "?forumPostId=" + forumPostId, this.httpOptions).pipe(catchError(this.handleError));
  }
}
