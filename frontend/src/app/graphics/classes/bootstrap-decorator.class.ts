import { Container } from '../types/container.type';
import { namespace } from './complex-shape-renderer.class';

export class BootstrapDecorator {
  constructor(private readonly target: Container) {
  }

  public decorateContainer()  {

  }

  public getColumn(): SVGRectElement {

    const rect: SVGRectElement = document.createElementNS(namespace, 'rect');

    return document.createElementNS(namespace, 'rect')
  }
}
