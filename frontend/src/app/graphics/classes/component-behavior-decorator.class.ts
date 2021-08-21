import { Container } from '../types/container.type';
import { filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { keys, Position } from './view-drag.class';
import { transform } from '../functions/transform.fuction';
import { globalOptions } from '../components/toolbar/toolbar.component';
import { GlobalDataService } from '../services/snapshot-observer.service';

export class ComponentBehaviorDecorator {
  constructor(private readonly target: Container, private readonly overlay: SVGSVGElement, private readonly source?: HTMLElement) {
  }

  public decorateComponentContainer(): Readonly<Container> {
    new ComponentDragSource(this.target, this.overlay).drag$
      .pipe(
        tap(position => {
          this.target.setAttribute('x', (position.x).toString());
          this.target.setAttribute('y', (position.y).toString());
        })
      )
      .subscribe()

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
