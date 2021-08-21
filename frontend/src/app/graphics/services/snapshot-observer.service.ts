import { Injectable } from '@angular/core';
import { ComponentContainer, ComponentsDataService } from './components-data.service';
import { BehaviorSubject, interval, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';
import { Project } from '../../projects/components/projects/projects.component';
import { Position } from '../classes/view-drag.class';

export class GlobalDataService {
  static changes$ = new BehaviorSubject<void>(null);
  static setViewOnElement = new Subject<Position>();
  static toggleToolbar$ = new BehaviorSubject<boolean>(true);
}

@Injectable({
  providedIn: 'root'
})
export class SnapshotObserverService {

  private container: SVGSVGElement;
  public components: ComponentContainer[];

  public readonly components$ = new Subject<ComponentContainer[]>();

  constructor(private readonly local: LocalStorageService, private readonly componentsDataService: ComponentsDataService) {
  }

  public build(container: SVGSVGElement) {
    this.container = container;
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
          }
        }
      }

      components.push(component);
    });

    this.components = components;
  }
}
