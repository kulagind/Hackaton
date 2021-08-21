import { Type } from '@angular/core';
import { DynamicComponentsFactory } from './dynamic-components-factory.class';
import { ComplexShapeRenderOptions } from '../types/complex-shape-rendere-options.type';
import { Container } from '../types/container.type';
import { ComponentBehaviorDecorator } from './component-behavior-decorator.class';
import { BootstrapDecorator } from './bootstrap-decorator.class';
import { GraphicElementProperties } from '../types/graphic-element-properties.type';
import { Dictionary } from '../services/components-data.service';
import { ToggleComponent } from '../../shared/modules/controls/components/toggle/toggle.component';
import { DesktopPlatformComponent } from '../components/platform/components/desktop-platform/desktop-platform.component';
import { MobilePlatformComponent } from '../components/platform/components/mobile-platform/mobile-platform.component';
import { ButtonComponent } from '../../shared/modules/buttons/components/button/button.component';
import { InputComponent } from '../../shared/modules/controls/components/input/input.component';
import { GlobalDataService } from '../services/snapshot-observer.service';
import { v4 as uuidv4 } from 'uuid'

export const namespace = 'http://www.w3.org/2000/svg';

export class ComplexShapeRenderer {

  constructor(private readonly container: NonNullable<Readonly<SVGSVGElement>>,
              private readonly dynamicComponentFactory: DynamicComponentsFactory) {
  }

  public appendDynamicComponentToContainer<T = any>
  (type: Type<Readonly<any>>, options?: ComplexShapeRenderOptions) {

    const compiledComponentWithMetaData = this.dynamicComponentFactory.getComponentFromAngularFactory(type);
    const container = this.dynamicComponentFactory.getContentContainer();
    const { component } = compiledComponentWithMetaData;

    const properties = { ...options, id: uuidv4() };

    new DynamicComponentContainerDecorator(container, this.container)
      .decorateDynamicComponentContainer(properties)
      .append(component);

    this.container.append(container);
    GlobalDataService.changes$.next();

  }

}


export class DynamicComponentContainerDecorator {

  private readonly componentBehaviorDecorator: NonNullable<ComponentBehaviorDecorator>
    = new ComponentBehaviorDecorator(this.target, this.overlay);

  private readonly bootstrapDecorator: NonNullable<BootstrapDecorator>
    = new BootstrapDecorator(this.target);

  constructor(private readonly target: Container, private readonly overlay: SVGSVGElement) {
    this.componentBehaviorDecorator.decorateComponentContainer();
  }

  public decorateDynamicComponentContainer(options: ComplexShapeRenderOptions): Container {
    this.target.setAttribute('x', options.x.toString());
    this.target.setAttribute('y', options.y.toString());
    this.target.setAttribute('width', options.property.width.toString());
    this.target.setAttribute('height', options.property.height.toString());
    this.target.setAttribute('type', options.type);
    this.target.setAttribute('id', options.id);

    this.target.classList.add('ui-element-container');

    this.bootstrapDecorator.decorateContainer();

    return this.target;
  }
}

export function componentPropertiesFactory(component: HTMLElement): { property: GraphicElementProperties } {
  const bounding = component.getBoundingClientRect();
  const { width, height } = bounding;

  return { property: { width, height } };
}

export const types: Dictionary<any> = {
  'toggle': ToggleComponent,
  'desktop': DesktopPlatformComponent,
  'mobile': MobilePlatformComponent,
  'button': ButtonComponent,
  'input': InputComponent,
}
