import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumFavoriteApiService } from '../../services/forum-favorite-api.service';
import { ForumPostApiService } from '../../services/forum-post-api.service';
import { ForumFavorite } from '../../models/forum_favorite.model';
import { ForumPost } from '../../models/forum_post.model';
import { UserApiService } from '../../../profile/services/user-api.service';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-forum-favorites',
  templateUrl: './forum-favorites.component.html',
  standalone: true,
  styleUrls: ['./forum-favorites.component.css'],
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule]
})
export class ForumFavoritesComponent implements OnInit {
  favoritePosts: ForumPost[] = [];
  private favorites: ForumFavorite[] = [];
  errorMessage: string = '';

  constructor(
    private forumFavoriteApiService: ForumFavoriteApiService,
    private forumPostApiService: ForumPostApiService,
    private userApiService: UserApiService
  ) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  goBack() {
    window.history.back();
  }

  loadFavorites(): void {
    const userId = this.userApiService.getUserId();

    this.forumFavoriteApiService.getFavoriteByUserId(userId).subscribe({
      next: (favorites) => {
        this.favorites = favorites;
        const postIds = favorites.map(fav => fav.forumPostId);

        this.forumPostApiService.getAll().subscribe({
          next: (allPosts) => {
            this.favoritePosts = allPosts.filter(post => postIds.includes(post.id));
          },
          error: () => {
            this.errorMessage = 'Error al cargar los posts.';
          }
        });
      },
      error: () => {
        this.errorMessage = 'Error al cargar favoritos.';
      }
    });
  }

  removeFavorite(postId: number): void {
    const userId = this.userApiService.getUserId();

    this.forumFavoriteApiService.deleteByUserAndPost(userId, postId).subscribe(() => {
      this.loadFavorites();
    });
  }

}
