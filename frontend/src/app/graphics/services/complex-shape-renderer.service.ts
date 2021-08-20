import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';
import { DynamicComponentsFactory } from '../classes/dynamic-components-factory.class';
import { ComplexShapeRenderer } from '../classes/complex-shape-renderer.class';

@Injectable({
  providedIn: 'root'
})
export class ComplexShapeRendererService {

  public container: SVGSVGElement;

  public complexShapeRenderer: ComplexShapeRenderer;
  private dynamicComponentFactory!: DynamicComponentsFactory;

  constructor(private readonly componentFactoryResolver: ComponentFactoryResolver) {}

  public buildComponentFactory(container: ViewContainerRef): ComplexShapeRendererService {
    this.dynamicComponentFactory = new DynamicComponentsFactory(this.componentFactoryResolver, container);
    return this;
  }

  public buildShapeRenderer(container: SVGSVGElement) {
    this.container = container;
    this.complexShapeRenderer = new ComplexShapeRenderer(container, this.dynamicComponentFactory);
  }
}
