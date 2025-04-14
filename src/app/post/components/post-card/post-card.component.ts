import {Component, Input} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {Post} from "../../models/post.model";
import {Router} from "@angular/router";
import {PostApiService} from "../../services/post-api.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'post-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css'
})
export class PostCardComponent {
  @Input() post: Post = {
    id: 0,
    advisorId: 0,
    title: '',
    description: '',
    image: ''
  }

  @Input() onDeletePost: (id: number) => void = () => {};

  constructor(private router: Router) {}

  onEdit(id: number) {
    this.router.navigateByUrl(`asesor/mis-publicaciones/${id}`);
  }

  onDelete(id: number) {
    this.onDeletePost(id);
  }
}
