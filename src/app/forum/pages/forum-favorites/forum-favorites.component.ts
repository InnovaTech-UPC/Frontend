import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumFavoriteApiService } from '../../services/forum-favorite-api.service';
import { ForumFavorite } from '../../models/forum_favorite.model';

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

  constructor(private favoriteService: ForumFavoriteApiService) {}

  ngOnInit(): void {
    this.loadFavorites();
    this.checkFavorite(1);
  }

  loadFavorites(): void {
    this.favoriteService.get().subscribe({
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
    this.favoriteService.getCheck(userId, forumPostId).subscribe({
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
