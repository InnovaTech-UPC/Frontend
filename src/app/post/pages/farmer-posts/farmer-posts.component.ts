import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {PostCardComponent} from "../../components/post-card/post-card.component";
import {AdvisorPostComponent} from "../../components/advisor-post/advisor-post.component";
import {AdvisorApiService} from "../../../profile/services/advisor-api.service";
import {PostApiService} from "../../services/post-api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {Post} from "../../models/post.model";

@Component({
  selector: 'farmer-posts',
  standalone: true,
    imports: [
        NgForOf,
        AdvisorPostComponent,
        NgIf
    ],
  templateUrl: './farmer-posts.component.html',
  styleUrl: './farmer-posts.component.css'
})
export class FarmerPostsComponent implements OnInit {
  constructor(private postApiService: PostApiService) {
  }
  posts: Post[] = [];

  ngOnInit() {
    this.getPosts();
  }

  getPosts(){
    this.postApiService.getAll()
      .subscribe({
        next: (posts: Post[]) => {
          this.posts = posts;
        },
        error: (error) => {
          console.error('Error fetching posts:', error);
        }
      })
  }
}
