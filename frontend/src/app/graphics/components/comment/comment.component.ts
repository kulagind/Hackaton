import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GlobalDataService } from '../../services/snapshot-observer.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  public show$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  @Input()
  public message: string;

  constructor() { }

  ngOnInit(): void {
  }

  public open() {
    GlobalDataService.showComment$.next(true);
  }

  public close() {
    GlobalDataService.showComment$.next(false);
  }

  public toggle() {
    this.show$.next(!this.show$.value)
  }

}
