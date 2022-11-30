import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Comment } from '../interface/comment.interface';
import { Post } from '../interface/post.interface';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  API_URL = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.API_URL}/posts`).pipe(share());
  }

  getComments(selectedpostId: number): Observable<Comment[]> {
    let params1 = new HttpParams().set('postId', selectedpostId);
    return this.http.get<Comment[]>(`${this.API_URL}/comments`, {
      params: params1,
    });
  }
}
