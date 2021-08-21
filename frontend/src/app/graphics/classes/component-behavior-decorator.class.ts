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
    const dragable = new ComponentDragSource(this.target, this.overlay)
    dragable.drag$
      .pipe(
        tap(position => {
          this.target.setAttribute('x', (position.x).toString());
          this.target.setAttribute('y', (position.y).toString());
        })
      )
      .subscribe();

    dragable.enter$
      .pipe(
        mergeMap(_ => {
          return dragable.move$
        }),
        mergeMap(_ => {
          return dragable.leave$
        }),
        tap(_ => {
          document.body.style.cursor = 'auto';
        })
      )
      .subscribe();

    return this.target;
  }
}

export class ComponentDragSource {

  public readonly type = this.target.getAttribute('type');

  public readonly move$ = fromEvent<MouseEvent>(window, 'mousemove');
  public readonly leave$ = fromEvent<MouseEvent>(window, 'mouseleave');
  public readonly drag$ = fromEvent<MouseEvent>(this.target, 'mousedown')
    .pipe(
      filter(down => !keys.includes(down.which)),
      switchMap(down => {
        const position = positionFactory(down.clientX, down.clientY);
        const shift = shiftFactory(down.target as HTMLElement, position);
        return this.move$.pipe(
          map(move => {
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

            return transform(isPlatform || !globalOptions.bootstrap  ? transferred : positionWithBootstrap)(this.global);
          }),
          tap((position) => {
            GlobalDataService.moveElementAndSend$.next({
              x: position.x,
              y: position.y,
              id: this.target.getAttribute('id')
            })
          }),
          takeUntil(fromEvent(window, 'mouseup').pipe(tap(() => GlobalDataService.changes$.next())))
        )
      })
    );

    public readonly enter$ = fromEvent<MouseEvent>(this.target, 'mouseenter').pipe(
      tap(enter => {
        const position = positionFactory(enter.clientX, enter.clientY);
        const {right, bottom} = this.target.getBoundingClientRect();
        const deltaX = right - position.x;
        const deltaY = bottom - position.y;
        if (deltaX <= 20 && deltaY <=20) {
          document.body.style.cursor = "se-resize"
        } else {
          document.body.style.cursor = "auto"
        }
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
