import { fromEvent, Observable } from 'rxjs';
import { filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { transform } from '../functions/transform.fuction';

export type Position = Readonly<{ x: number, y: number }>;

export class Drag {

  public shift = {
    shiftX: 0, shiftY: 0
  }

  public readonly up$: Observable<MouseEvent> =
    fromEvent<MouseEvent>(window, 'mouseup');

  public readonly drag$: Observable<MouseEvent> =
    fromEvent<MouseEvent>(window, 'mousemove');

  public readonly down$: Observable<Position> =
    fromEvent<MouseEvent>(this.target, 'mousedown')
      .pipe(
        filter(down => keys.includes(down.which)),
        tap(down => down.preventDefault()),
        map(down => {

          const { clientX, clientY } = down;
          const { left, top } = this.target.getBoundingClientRect();

          const shiftX = clientX - left;
          const shiftY = clientY - top;

          this.shift = { shiftX, shiftY };

          const position = { x: clientX - shiftX, y: clientY - shiftY };

          return transform(position)(this.target as SVGSVGElement)
        }),
      );

  public readonly move$: Observable<Position> =
    fromEvent<MouseEvent>(this.target, 'mousedown')
      .pipe(
        filter(down => keys.includes(down.which)),
        tap(down => down.preventDefault()),
        switchMap(_ => this.drag$
          .pipe(
            map(move => {
              const { pageX, pageY } = move;
              const position = { x: pageX - this.shift.shiftX, y: pageY - this.shift.shiftY };
              return transform(position)(this.target as SVGSVGElement)
            }),
            takeUntil(this.up$),
          )
        )
      );

  constructor(private readonly target: SVGElement) {
  }

}

export const keys = [2, 5];
