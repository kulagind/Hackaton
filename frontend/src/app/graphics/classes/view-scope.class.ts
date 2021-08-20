import { BehaviorSubject, interval } from 'rxjs';
import { finalize, map, takeWhile, tap } from 'rxjs/operators';
import { Drag } from './view-drag.class';
import { Zoom } from './view-zoom.class';

export type View = {
  x: number,
  y: number,
  z: number
}

export class Scope {

  public readonly view: View = defaultViewFactory();
  public readonly scope$ = new BehaviorSubject<string>('');

  private initialView: View = { x: 0, y: 0, z: 0 };
  private readonly drag = new Drag(this.container);
  private readonly zoom = new Zoom(this.container);

  constructor(private readonly container: SVGElement, defaultViewBox: string = '') {
    if (defaultViewBox) {
      this.setViewBox(defaultViewBox);
    } else {
      this.initializeContainerScope();
    }
    this.subscribeToChangeScope();
    this.subscribeToScopeDown();
    this.subscribeToZoom();
  }

  public setDefaultScale(): void {
    const updatedZ = this.container.clientWidth;
    const { x, y, z } = this.view;

    const updatedX = ((z - updatedZ) / 100) * 55 + x;
    const signZ = (updatedZ - z) / Math.abs(updatedZ - z);

    const view = `${updatedX} ${y} ${updatedZ} ${updatedZ / 100}`;

    this.scope$.next(view);
    
    interval(2).pipe(
      map(value => value * 30),
      takeWhile(value => value < Math.abs(updatedZ - z)),
      tap(value => {
        const tempView = `${x - (((value * signZ) / 100) * 55)} ${y} ${z + value * signZ} ${(z + value * signZ) / 100}`;
        this.container.setAttribute('viewBox', tempView);
      }),
      finalize(() => {
        this.container.setAttribute('viewBox', view);
        this.view.x = updatedX;
        this.view.z = updatedZ;
      })
    ).subscribe();
  }

  private setViewBox(viewBox: string): void {
    this.scope$.next(viewBox);
    this.container.setAttribute('viewBox', viewBox);
  }

  private initializeContainerScope() {
    this.updateContainerScope();
  }

  private updateContainerScope() {
    const { x, y, z } = this.view;

    const view = `${x} ${y} ${z} ${z / 100}`;

    this.scope$.next(view);
    this.container.setAttribute('viewBox', view);
  }

  private subscribeToChangeScope() {
    this.drag.move$
      .pipe(
        tap(data => {
          const { x, y } = data;
          this.view.x += this.initialView.x - x;
          this.view.y += this.initialView.y - y;
        }),
        tap(_ => this.updateContainerScope())
      )
      .subscribe()
  }

  private subscribeToScopeDown() {
    this.drag.down$
      .pipe(
        tap(data => {
          // @ts-ignore
          this.initialView = data;
        })
      )
      .subscribe()
  }

  private subscribeToZoom() {
    this.zoom.zoom$
      .pipe(
        tap(zoom => {
          this.view.z += zoom.z;
          console.log(zoom.z)
          if (this.view.z <= 0) {
            return;
          }

          if (zoom.z > 0) {
            this.view.x -= 55;
          }

          if (zoom.z < 0) {
            this.view.x += 55;
          }

          this.updateContainerScope();
        })
      )
      .subscribe()
  }

}

export function defaultViewFactory(): Readonly<View> {
  return { x: -1400, y: 0, z: 3400 };
}
