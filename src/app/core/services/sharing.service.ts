import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharingService {
  constructor() {}

  private comments = new BehaviorSubject('');
  comments$ = this.comments.asObservable();

  shareCommentsValue(data: any) {
    this.comments.next(data);
  }
}
