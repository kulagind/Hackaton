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
import { SelectComponent } from 'src/app/shared/modules/controls/components/select/select.component';
import { IconComponent } from 'src/app/shared/modules/controls/components/icon/icon.component';
import { HeaderComponent } from 'src/app/shared/modules/controls/components/header/header.component';
import { CommentComponent } from '../components/comment/comment.component';
import { TextComponent } from '../../shared/modules/controls/components/text/text.component';

export const namespace = 'http://www.w3.org/2000/svg';

export class ComplexShapeRenderer {

  constructor(private readonly container: NonNullable<Readonly<SVGSVGElement>>,
              private readonly dynamicComponentFactory: DynamicComponentsFactory) {
  }

  public appendDynamicComponentToContainer<T = any>
  (type: Type<Readonly<any>>, options?: ComplexShapeRenderOptions, name?: string) {

    const compiledComponentWithMetaData = this.dynamicComponentFactory.getComponentFromAngularFactory(type);
    const container = this.dynamicComponentFactory.getContentContainer();
    const { component } = compiledComponentWithMetaData;

    if (name) {
      // @ts-ignore
      component.innerHTML = name;
      component.style.color = '#B5B7C0';
    }

    const properties = { ...options, id: options.id ?? uuidv4() };

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
    
    if (options.property.content) {
      // @ts-ignore
      this.target.innerHTML = options.property.content;
    }
    

    this.target.classList.add('ui-element-container');

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
  'select': SelectComponent,
  'icon': IconComponent,
  'header': HeaderComponent,
  'text': TextComponent,
  'comment': CommentComponent,
}
