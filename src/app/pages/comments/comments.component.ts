import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharingService } from 'src/app/core/services/sharing.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/core/interface/post.interface';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit, OnDestroy {
  title: string = 'Comments';
  post!: Post;
  routeId!: any;
  comments: any;
  selectedPost!: Post;

  private subscription1$ = new Subscription();
  private subscription2$ = new Subscription();

  constructor(
    private sharingService: SharingService,
    private activatedRoute: ActivatedRoute,
    private route: Router
  ) {
    this.activatedRoute.params.subscribe(
      (params) => (this.routeId = params['id'])
    );
  }

  ngOnInit(): void {
    this.getComments();
    this.getSelectedPostValue();

    // To avoid entering another url => Check if the post id matches the page url or not
    if (this.routeId != this.post.id) {
      this.route.navigateByUrl('/');
    }
  }

  private getSelectedPostValue() {
    let retrievedObject: any = localStorage.getItem('storedSelectedPost');
    this.post = JSON.parse(retrievedObject);
  }


  private getComments() {
    this.subscription1$ = this.sharingService.comments$.subscribe((val) => {
      if (val) {
        this.comments = val;
         //Because when we refresh the comment page, the data will be deleted, that's why I saved it in Localstorage.
        localStorage.setItem('storedComments', JSON.stringify(val));
      } else {
        let retrievedObject: any = localStorage.getItem('storedComments');
        this.comments = JSON.parse(retrievedObject);
      }
    });
  }

  ngOnDestroy() {
    this.subscription1$.unsubscribe();
    this.subscription2$.unsubscribe();
  }
}
