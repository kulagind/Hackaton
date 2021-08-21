import { Container } from '../types/container.type';
import { filter, map, mergeMap, switchMap, takeUntil, tap, throttleTime } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { keys, Position } from './view-drag.class';
import { transform } from '../functions/transform.fuction';
import { globalOptions } from '../components/toolbar/toolbar.component';
import { GlobalDataService, SnapshotObserverService } from '../services/snapshot-observer.service';

export class ComponentBehaviorDecorator {
  constructor(private readonly target: Container, private readonly overlay: SVGSVGElement, private readonly source?: HTMLElement) {
  }

  public decorateComponentContainer(): Readonly<Container> {
    const dragable = new ComponentDragSource(this.target, this.overlay);
    dragable.drag$
      .pipe(
        tap(position => {
          if (position.x) {
            this.target.setAttribute('x', (position.x).toString());
          }
          if (position.y) {
            this.target.setAttribute('y', (position.y).toString());
          }
          if (position.width) {
            this.target.setAttribute('width', (position.width).toString());
          }
          if (position.height) {
            this.target.setAttribute('height', (position.height).toString());
          }
        })
      )
      .subscribe();

    return this.target;
  }
}

export class ComponentDragSource {

  public readonly type = this.target.getAttribute('type');

  public readonly move$ = fromEvent<MouseEvent>(window, 'mousemove');

  public readonly drag$ = fromEvent<MouseEvent>(this.target, 'mousedown')
    .pipe(
      filter(down => !keys.includes(down.which)),
      switchMap(down => {
        // down.preventDefault();
        const startingPosition = positionFactory(down.clientX, down.clientY);
        const shift = shiftFactory(down.target as HTMLElement, startingPosition);        

        // @ts-ignore
        const {x, y} = this.target.getBoundingClientRect();    
          
        const width = +this.target.getAttribute('width');
        const height = +this.target.getAttribute('height');

        return this.move$.pipe(
          // @ts-ignore
          filter(move => move.target.getBoundingClientRect().x),
          map(move => {
            // move.preventDefault();
            const movingPosition = positionFactory(move.clientX, move.clientY);
            const transferred: Position = {
              x: Math.ceil(move.clientX - shift.x),
              y: Math.ceil(move.clientY - shift.y)
            };
            
            const positionWithBootstrap = {
              x: bootstrap(transferred.x, 32),
              y: bootstrap(transferred.y, 32),
            }

            const type = this.target.getAttribute('type');
            const isPlatform = type === 'mobile' || type === 'desktop';

            // @ts-ignore
            const updatedFO = move.target.get;
            
            const updatedCoords = transform(isPlatform || !globalOptions.bootstrap  ? transferred : positionWithBootstrap)(this.global);            
            const oldCoords = transform({x, y})(this.global);
            
            if (down.which === 3) {
              return {
                // @ts-ignore
                width: width + (movingPosition.x - startingPosition.x),
                // @ts-ignore
                height: height + (movingPosition.y - startingPosition.y),
                x: oldCoords.x,
                y: oldCoords.y
              };
            } else {
              return {
                // @ts-ignore
                width: down.clientWidth,
                // @ts-ignore
                height: down.clientHeight,
                x: updatedCoords.x,
                y: updatedCoords.y
              };
            }
          }),
          tap((position) => {
            GlobalDataService.moveElementAndSend$.next({
              x: position.x,
              y: position.y,
              width: position.width,
              height: position.height,
              id: this.target.getAttribute('id')
            })
          }),
          takeUntil(fromEvent(window, 'mouseup').pipe(tap(() => GlobalDataService.changes$.next())))
        )
      })
    );

  constructor(private readonly target: Container, private readonly global: SVGSVGElement) {
    
  }
}

export function shiftFactory(
  target: HTMLElement,
  source: NonNullable<Readonly<Position>>
): Readonly<Position> {

  const { left, top } = target.getBoundingClientRect();
  const { x, y } = source;

  const shiftX = x - left;
  const shiftY = y - top;

  return ({ x: shiftX, y: shiftY });
}

export function positionFactory(x: number, y: number): NonNullable<Readonly<Position>> {
  return { x, y };
}

export function bootstrap(x: number, bootstrap = 8): number {
  return x % bootstrap < (bootstrap / 2)  ? (x % bootstrap === 0 ? x : Math.floor(x / bootstrap) * bootstrap) : Math.ceil(x / bootstrap) * bootstrap
}
