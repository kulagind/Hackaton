import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

export class Zoom {
  public readonly zoom$ = fromEvent<WheelEvent>(this.target, 'wheel')
    .pipe(
      map(wheel => {
        const { deltaY, clientX, clientY } = wheel;
        return {z: deltaY > 0 ? 100 : -100, x: clientX, y: clientY}
      })
    )

  constructor(private readonly target: SVGElement) {}
}
