import { Injectable } from '@angular/core';
import { ComponentContainer } from './components-data.service';
import { interval, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';
import { Project } from '../../projects/components/projects/projects.component';

@Injectable({
  providedIn: 'root'
})
export class SnapshotObserverService {

  private container: SVGSVGElement;
  public components: ComponentContainer[];

  public readonly components$ = new Subject<ComponentContainer[]>();

  constructor(private readonly local: LocalStorageService) {
  }

  public build(container: SVGSVGElement) {
    this.container = container;
  }

  public processInfinityObserve() {
    interval(1000)
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
