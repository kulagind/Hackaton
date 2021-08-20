import { Injectable } from '@angular/core';
import { ComplexShapeRenderOptions } from '../types/complex-shape-rendere-options.type';
import { ToggleComponent } from '../../shared/modules/controls/components/toggle/toggle.component';
import { defaultComplexShapeRenderingOptionsFactory } from '../functions/default-complex-shape-render-options.factory';
import { DesktopPlatformComponent } from '../components/platform/components/desktop-platform/desktop-platform.component';

@Injectable({
  providedIn: 'root'
})
export class ComponentsDataService {

  public readonly containers: ComponentContainer[] = [
    {
      component: 'desktop',
      options: { ...defaultComplexShapeRenderingOptionsFactory(), type: 'desktop' }
    },
    {
      component: 'toggle',
      options: { ...defaultComplexShapeRenderingOptionsFactory(), type: 'toggle' }
    },
  ]

  constructor() { }
}


export type ComponentContainer = Readonly<{
  component?: string;
  html?: HTMLElement;
  options: ComplexShapeRenderOptions
}>

export interface Dictionary<T> {
  [p: string]: T
}
