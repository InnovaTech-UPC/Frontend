import { Component } from '@angular/core';
import { ForumComponent } from '../../components/forum/forum.component';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-forum-page',
  templateUrl: './forum-page.component.html',
  styleUrls: ['./forum-page.component.css'],
  standalone: true,
  imports: [ForumComponent, RouterLink]
})
export class ForumPageComponent { }
