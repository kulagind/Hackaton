import { Position } from '../classes/view-drag.class';

export function transform(
  target: Position
): (container: NonNullable<SVGSVGElement>) => Readonly<Position> {
  const { x, y } = target;

  return (container: NonNullable<SVGSVGElement>): Readonly<Position> => {
    const element: SVGPoint = container.createSVGPoint();

    element.x = x;
    element.y = y;

    return element.matrixTransform(
      // @ts-ignore
      container.getScreenCTM().inverse()
    );
  }
}
