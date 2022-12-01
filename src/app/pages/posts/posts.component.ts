import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Post } from 'src/app/core/interface/post.interface';
import { ApiService } from 'src/app/core/services/api.service';
import { SharingService } from 'src/app/core/services/sharing.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  title: string = 'Posts';

  private subscription1$ = new Subscription();
  private subscription2$ = new Subscription();

  constructor(
    private apiService: ApiService,
    private router: Router,
    private sharingService: SharingService
  ) {}

  ngOnInit(): void {
    this.getPosts();
  }

  private getPosts() {
    this.subscription1$ = this.apiService.getPosts().subscribe({
      next: (data) => {
        this.posts = data;
      },
      error: (error) => {},
    });
  }

  private getComments(post: Post) {
    this.subscription2$ = this.apiService.getComments(post.id).subscribe({
      next: (data) => {
        this.sharingService.shareCommentsValue(data);
        localStorage.setItem('storedSelectedPost', JSON.stringify(post)); //to Reload Current Page Without Losing data
        this.router.navigate(['/comments', post.id]);
      },
      error: (error) => {},
    });
  }

  navigateToCommentPage(post: Post) {
    this.getComments(post);
  }

  ngOnDestroy() {
    this.subscription1$.unsubscribe();
    this.subscription2$.unsubscribe();
  }
}
