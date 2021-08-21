import { namespace } from './complex-shape-renderer.class';

export class BootstrapDecorator {
  constructor(private readonly target: SVGSVGElement) {
  }

  public decorateContainer() {

    for (let i = 0; i < 1000; i++) {
      const x = i * (32 - 1);
      this.target.append(this.getVerticalColumn(x, 0))
    }

    for (let i = 0; i < 1000; i++) {
      const y = i * (32 - 1);
      this.target.append(this.getHorizontalColumn(0, y))
    }

    for (let i = -1000; i < 0; i++) {
      const x = i * (32 - 1);
      this.target.append(this.getVerticalColumn(x, 0))
    }

    for (let i = -1000; i < 0; i++) {
      const y = i * (32 - 1);
      this.target.append(this.getHorizontalColumn(0, y))
    }


  }

  public getVerticalColumn(x: number, y: number, reverse = false): SVGRectElement {

    const rect: SVGRectElement = document.createElementNS(namespace, 'rect');
    rect.setAttribute('x', reverse ? `-${x}` : `${x}`)
    rect.setAttribute('y', y.toString())

    rect.setAttribute('width', '1');
    rect.setAttribute('height', '10000000');

    rect.setAttribute('fill', 'black');
    rect.setAttribute('fill-opacity', '0.1');


    return rect;
  }

  public getHorizontalColumn(x: number, y: number, reverse = false): SVGRectElement {

    const rect: SVGRectElement = document.createElementNS(namespace, 'rect');
    rect.setAttribute('x', `${x}`)
    rect.setAttribute('y', reverse ? `-${y}` : `${y}`)

    rect.setAttribute('width', '10000000');
    rect.setAttribute('height', '1');

    rect.setAttribute('fill', 'black');
    rect.setAttribute('fill-opacity', '0.1');


    return rect;
  }
}
