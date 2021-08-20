import { ComplexShapeRenderOptions } from '../types/complex-shape-rendere-options.type';

export function defaultComplexShapeRenderingOptionsFactory(): ComplexShapeRenderOptions {
  return {
    x: 560,
    y: 340,
    property: {
      width: 60,
      height: 60
    }
  }
}
