import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ForumPost } from '../../models/forum_post.model';
import { ForumPostApiService } from '../../services/forum-post-api.service';
import { ForumFavoriteApiService } from '../../services/forum-favorite-api.service';
import {ForumFavorite} from "../../models/forum_favorite.model";


@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  posts: ForumPost[] = [];
  favoriteIds: number[] = [];

  newPost: Partial<ForumPost> = {
    title: '',
    content: ''
  };

  constructor(
    private postService: ForumPostApiService,
    private favoriteService: ForumFavoriteApiService
  ) {}

  ngOnInit(): void {
    this.loadPosts();
    this.loadFavorites();
  }

  loadPosts(): void {
    this.postService.getAll().subscribe(posts => {
      this.posts = posts;
    });
  }

  loadFavorites(): void {
    const userId = Number(localStorage.getItem('user_id'));
    this.favoriteService.getAll().subscribe(favs => {
      this.favoriteIds = favs
        .filter(f => f.userId === userId)
        .map(f => f.forumPostId);
    });
  }

  addToFavorites(postId: number): void {
    const userId = Number(localStorage.getItem('user_id'));
    const newFavorite: ForumFavorite = {
      id: 0,
      userId,
      forumPostId: postId
    };
    this.favoriteService.create(newFavorite).subscribe(() => {
      this.loadFavorites();
    });
  }

  isFavorite(postId: number): boolean {
    return this.favoriteIds.includes(postId);
  }

  submitPost(): void {
    const userId = Number(localStorage.getItem('user_id'));
    if (this.newPost.title && this.newPost.content) {
      const newPost: ForumPost = {
        id: 0,
        userId,
        title: this.newPost.title,
        content: this.newPost.content
      };
      this.postService.create(newPost).subscribe(() => {
        this.newPost = { title: '', content: '' };
        this.loadPosts();
      });
    }
  }
}
