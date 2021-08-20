import { ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Type, ViewContainerRef } from '@angular/core';
import { Container } from '../types/container.type';
import { namespace } from './complex-shape-renderer.class';
import { GraphicElementProperties } from '../types/graphic-element-properties.type';
import { GraphicComponent } from '../decalarations/graphic-component.type';
import { defaultGraphicComponentsPropertiesFactory } from '../functions/default-graphic-components-properties.factory';

export type CompiledComponentWithMetaData = Readonly<{
  component: Readonly<HTMLElement>;
  properties: Readonly<GraphicElementProperties>;
}>

export class DynamicComponentsFactory {

  constructor(private readonly angularComponentFactory: ComponentFactoryResolver,
              private readonly angularComponentContainer: ViewContainerRef) {
  }

  public getComponentFromAngularFactory<T extends GraphicComponent>(target: Type<Readonly<T>>): CompiledComponentWithMetaData {
    const component: ComponentRef<T> = this.compileDynamicComponent<T>(target);
    return {
      component: this.extractHTMLFromAngularComponentsFactory(component),
      properties: component.instance.graphicElementProperties ?? defaultGraphicComponentsPropertiesFactory(),
    };
  }

  private compileDynamicComponent<T>(component: Type<Readonly<T>>): Readonly<ComponentRef<T>> {
    const factory = this.angularComponentFactory.resolveComponentFactory(component);
    return this.angularComponentContainer.createComponent(factory);
  }

  private extractHTMLFromAngularComponentsFactory<T>(component: ComponentRef<T>): HTMLElement {
    return (component.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
  }

  public getContentContainer(): Container {
    return document.createElementNS(namespace, 'foreignObject');
  }
}
