import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {ForumReply} from "../models/forum_reply.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ForumReplyApiService extends BaseService<ForumReply> {

  constructor(http: HttpClient) {
    super(http);
    this.extraUrl = environment.forumReplyURL;
  }
}
