import { Component, OnInit } from '@angular/core';
import { GlobalDataService } from '../../services/snapshot-observer.service';
import {
  tooltipAnimationFactory,
  tooltipImageAnimationFactory,
  tooltipTextAnimationFactory
} from '../../animations/comment-animation.factory';
import { BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-comment-container',
  templateUrl: './comment-container.component.html',
  styleUrls: ['./comment-container.component.scss'],
  animations: [
    tooltipAnimationFactory({ name: 'global', time: 550 }),
    tooltipImageAnimationFactory({ name: 'image', time: 250 }),
    tooltipTextAnimationFactory({ name: 'text', time: 250 }),
  ]
})
export class CommentContainerComponent implements OnInit {

  public isShow$ = GlobalDataService.showComment$;
  public trigger$ = new BehaviorSubject(true)
    .pipe(
      delay(50)
    )

  constructor() { }

  ngOnInit(): void {
  }

}
