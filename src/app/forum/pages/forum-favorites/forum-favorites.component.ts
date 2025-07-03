import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumFavoriteApiService } from '../../services/forum-favorite-api.service';
import { ForumFavorite } from '../../models/forum_favorite.model';
import {UserApiService} from "../../../profile/services/user-api.service";

@Component({
  selector: 'app-forum-favorites',
  templateUrl: './forum-favorites.component.html',
  standalone: true,
  styleUrls: ['./forum-favorites.component.css'],
  imports: [CommonModule]
})
export class ForumFavoritesComponent implements OnInit {
  favorites: ForumFavorite[] = [];
  isFavorite: boolean = false;
  errorMessage: string = '';

  constructor(private forumFavoriteApiService: ForumFavoriteApiService,
              private userApiService: UserApiService
  ) {}

  ngOnInit(): void {
    this.loadFavorites();
    this.checkFavorite(1);
  }

  loadFavorites(): void {
    var userId = this.userApiService.getUserId();
    this.forumFavoriteApiService.getFavoriteByUserId(userId).subscribe({
      next: (data) => {
        this.favorites = data;
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar favoritos.';
        console.error(error);
      }
    });
  }

  checkFavorite(forumPostId: number): void {
    const userId = Number(localStorage.getItem('user_id'));
    this.forumFavoriteApiService.getCheck(userId, forumPostId).subscribe({
      next: (result) => {
        this.isFavorite = result;
      },
      error: (error) => {
        this.errorMessage = 'Error al verificar favorito.';
        console.error(error);
      }
    });
  }
}
