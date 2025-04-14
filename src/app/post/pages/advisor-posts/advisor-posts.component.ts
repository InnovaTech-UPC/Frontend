import {Component, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {AdvisorApiService} from "../../../user/services/advisor-api.service";
import {Router} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {Post} from "../../models/post.model";
import {PostCardComponent} from "../../components/post-card/post-card.component";
import {PostApiService} from "../../services/post-api.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'advisor-posts',
  standalone: true,
  imports: [
    MatButton,
    MatIcon,
    NgForOf,
    PostCardComponent,
    NgIf
  ],
  templateUrl: './advisor-posts.component.html',
  styleUrl: './advisor-posts.component.css'
})
export class AdvisorPostsComponent implements OnInit {
  constructor(private advisorApiService: AdvisorApiService,
              private postApiService: PostApiService,
              private snackBar: MatSnackBar,
              private router: Router) {
  }
  advisorId = 0;
  posts: Post[] = [];

  ngOnInit() {
    this.advisorId = this.advisorApiService.getAdvisorId();
    this.getPosts(this.advisorId);
  }

  getPosts(advisorId: number){
    this.postApiService.getPostsByAdvisorId(advisorId)
      .subscribe({
        next: (posts: Post[]) => {
          this.posts = posts;
        },
        error: (error) => {
          console.error('Error fetching posts:', error);
        }
      })
  }

  goToCreatePost() {
    this.router.navigate(['/asesor/nueva-publicacion']);
  }

  deletePost(id: number) {
    this.postApiService.delete(id).subscribe({
      next: () => {
        this.snackBar.open('Publicación eliminada existosamente', 'Cerrar', {
          duration: 2000,
        });
        this.getPosts(this.advisorId);
      },
      error: (error) => {
        this.snackBar.open('Error eliminado la publicación', 'Cerrar', {
          duration: 2000,
        });
        console.error('Error deleting post:', error);
      }
    })
  }
}
