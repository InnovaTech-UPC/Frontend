import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ForumPost } from '../../models/forum_post.model';
import { ForumPostApiService } from '../../services/forum-post-api.service';
import { ForumFavoriteApiService } from '../../services/forum-favorite-api.service';
import { ForumReplyApiService } from '../../services/forum-reply-api.service';
import { ForumReply } from '../../models/forum_reply.model';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { UserApiService } from '../../../profile/services/user-api.service';
import { ProfileApiService } from '../../../profile/services/profile-api.service';

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButton],
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  posts: ForumPost[] = [];
  favoriteIds: number[] = [];
  replies: { [key: number]: ForumReply[] } = {};
  showReplies: { [key: number]: boolean } = {};
  newReplyContent: { [key: number]: string } = {};
  userNamesCache: { [key: number]: string } = {};

  newPost: Partial<ForumPost> = {
    title: '',
    content: ''
  };

  constructor(
    private postService: ForumPostApiService,
    private favoriteService: ForumFavoriteApiService,
    private forumReplyApiService: ForumReplyApiService,
    private userApiService: UserApiService,
    private profileApiService: ProfileApiService,
    private router: Router
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
    const userId = this.userApiService.getUserId();
    this.favoriteService.getFavoriteByUserId(userId).subscribe(favs => {
      this.favoriteIds = favs
        .filter(f => f.userId === userId)
        .map(f => f.forumPostId);
    });
  }

  addToFavorites(postId: number): void {
    const userId = Number(localStorage.getItem('user_id'));
    const newFavorite = { id: 0, userId, forumPostId: postId };
    this.favoriteService.create(newFavorite).subscribe(() => {
      this.loadFavorites();
    });
  }

  isFavorite(postId: number): boolean {
    return this.favoriteIds.includes(postId);
  }

  goToFavorites(): void {
    this.router.navigate(['/foro/favoritos']);
  }

  submitPost(): void {
    const userId = Number(localStorage.getItem('user_id'));
    if (this.newPost.title && this.newPost.content) {
      const newPost = { id: 0, userId, title: this.newPost.title, content: this.newPost.content };
      this.postService.create(newPost).subscribe(() => {
        this.newPost = { title: '', content: '' };
        this.loadPosts();
      });
    }
  }

  sendReply(postId: number): void {
    const userId = this.userApiService.getUserId();
    const replyContent = this.newReplyContent[postId];

    if (replyContent) {
      const reply = { id: 0, userId, forumPostId: postId, content: replyContent };
      this.forumReplyApiService.create(reply).subscribe({
        next: () => {
          this.newReplyContent[postId] = ''; // Clear the reply content
          this.loadReplies(postId); // Reload replies
        },
        error: () => {
          alert('Error al enviar la respuesta.');
        }
      });
    }
  }

  toggleReplies(postId: number): void {
    this.showReplies[postId] = !this.showReplies[postId];
    if (this.showReplies[postId] && !this.replies[postId]) {
      this.loadReplies(postId);
    }
  }

  loadReplies(postId: number): void {
    this.forumReplyApiService.getRepliesByForumPostId(postId).subscribe({
      next: replies => {
        this.replies[postId] = replies;
      },
      error: () => {
        console.error('Error al cargar las respuestas.');
      }
    });
  }

  getUserName(userId: number): string {
    if (this.userNamesCache[userId]) {
      return this.userNamesCache[userId];
    }

    this.profileApiService.getProfileByUserId(userId).subscribe({
      next: (profile) => {
        this.userNamesCache[userId] = profile.firstName;
      },
      error: () => {
        this.userNamesCache[userId] = 'Unknown';
      }
    });

    return 'Loading...';
  }
}
