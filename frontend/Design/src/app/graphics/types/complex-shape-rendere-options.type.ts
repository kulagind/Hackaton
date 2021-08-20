export type ComplexShapeRenderOptions = Readonly<{
  layout?: Readonly<1 | 2 | 3>;
  x: Readonly<number>;
  y: Readonly<number>;
  type?: any;

  property: {
    width: Readonly<number>;
    height: Readonly<number>
  }
}>
