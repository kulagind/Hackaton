import { Injectable } from '@angular/core';
import { ComponentContainer } from './components-data.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Position } from '../classes/view-drag.class';
import { CursorsService } from './cursors.service';

export class GlobalDataService {
  static changes$ = new BehaviorSubject<void>(null);
  static setViewOnElement = new Subject<Position>();
  static toggleToolbar$ = new BehaviorSubject<boolean>(true);
  static showComment$ = new BehaviorSubject<boolean>(false);
  static moveElementAndSend$ = new BehaviorSubject<any>(null);
}

@Injectable({
  providedIn: 'root'
})
export class SnapshotObserverService {

  private container: SVGSVGElement;
  public components: ComponentContainer[];
  static componentList: ComponentContainer[];

  public readonly components$ = new Subject<ComponentContainer[]>();

  constructor(private readonly cursorService: CursorsService) {
  }

  public build(container: SVGSVGElement) {
    this.container = container;
    SnapshotObserverService.componentList = this.components;
  }

  public processInfinityObserve() {
    GlobalDataService.changes$
      .pipe(
        tap(_ => this.snapshot())
      )
      .subscribe(() => {
        this.components$.next(this.components);
      })
  }

  public snapshot() {
    const components = []
    const targets = this.container.querySelectorAll('.ui-element-container');

    targets.forEach((value, _) => {

      const component: ComponentContainer = {
        component: value.getAttribute('type'),
        options: {

          x: +value.getAttribute('x'),
          y: +value.getAttribute('y'),
          type: value.getAttribute('type'),
          id: value.getAttribute('id'),

          property: {
            width: +value.getAttribute('width'),
            height: +value.getAttribute('height'),
            content: value.innerHTML || '',
          }
        }
      }

      components.push(component);
    });

    this.components = components;
    SnapshotObserverService.componentList = this.components;
  }
}
