import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {ForumFavorite} from "../models/forum_favorite.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ForumFavoriteApiService extends BaseService<ForumFavorite> {

  constructor(http: HttpClient) {
    super(http);
    this.extraUrl = environment.forumFavoriteURL
  }
}
