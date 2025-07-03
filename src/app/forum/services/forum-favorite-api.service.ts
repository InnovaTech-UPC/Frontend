import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../shared/services/base.service';
import { ForumFavorite } from '../models/forum_favorite.model';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForumFavoriteApiService extends BaseService<ForumFavorite> {
  constructor(http: HttpClient) {
    super(http);
    this.extraUrl = environment.forumFavoriteURL;
  }

  getFavoriteByUserId(userId: number): Observable<ForumFavorite[]> {
    this.setToken();
    return this.http.get<ForumFavorite[]>(this.buildPath() + "?userId=" + userId, this.httpOptions).pipe(catchError(this.handleError));
  }

  getFavoriteByForumPostId(postId: number): Observable<ForumFavorite[]> {
    this.setToken();
    return this.http.get<ForumFavorite[]>(this.buildPath() + "?forumPostId=" + postId, this.httpOptions).pipe(catchError(this.handleError));
  }

  getCheck(userId: number, forumPostId: number): Observable<boolean> {
    this.setToken();
    return this.http.get<boolean>(
      `${this.buildPath()}/check?userId=${userId}&forumPostId=${forumPostId}`,
      this.httpOptions
    ).pipe(catchError(this.handleError));
  }



}
