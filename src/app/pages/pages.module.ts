import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PostsComponent } from './posts/posts.component';
import { CommentsComponent } from './comments/comments.component';
import { SweetalertService } from '../core/services/sweetalert.service';
import { SharingService } from '../core/services/sharing.service';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    PostsComponent,
    CommentsComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule
  ],
  providers: [SweetalertService, SharingService]
})
export class PagesModule { }
