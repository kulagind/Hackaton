import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComplexShapeRendererService } from '../../services/complex-shape-renderer.service';
import { CdkDragDrop, CdkDragStart } from '@angular/cdk/drag-drop';
import { MobilePlatformComponent } from './components/mobile-platform/mobile-platform.component';
import { ComplexShapeRenderOptions } from '../../types/complex-shape-rendere-options.type';
import { DesktopPlatformComponent } from './components/desktop-platform/desktop-platform.component';
import { ToggleComponent } from '../../../shared/modules/controls/components/toggle/toggle.component';
import { transform } from '../../functions/transform.fuction';
import { Position } from '../../classes/view-drag.class';
import { ButtonComponent } from '../../../shared/modules/buttons/components/button/button.component';
import { ScopeSharerService } from '../../services/scope-sharer.service';

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.scss'],
})
export class PlatformComponent {

  private pickupPositionInElement: Position;

  @ViewChild('mobile')
  private readonly mobile: ElementRef<HTMLElement>;

  constructor(
    private readonly complexShapeRendererService: ComplexShapeRendererService,
    private readonly scopeService: ScopeSharerService
  ) {
  }

  public handleMobileDrop(event: CdkDragDrop<any> | any) {
    const { x, y } = event.dropPoint;
    const deltaX = x - this.pickupPositionInElement.x;
    const deltaY = y - this.pickupPositionInElement.y;
    const position = transform({x: deltaX, y: deltaY})(this.complexShapeRendererService.container);

    const options: ComplexShapeRenderOptions = {
      x: position.x,
      y: position.y,
      type: 'mobile',
      property: {
        width: 375,
        height: 812
      }
    }

    this.complexShapeRendererService
      .complexShapeRenderer
      .appendDynamicComponentToContainer(MobilePlatformComponent, options);
  }

  public handleDesktopDrop(event: CdkDragDrop<any>) {
    const { x, y } = event.dropPoint;
    const deltaX = x - this.pickupPositionInElement.x;
    const deltaY = y - this.pickupPositionInElement.y;
    const position = transform({x: deltaX, y: deltaY})(this.complexShapeRendererService.container);

    const options: ComplexShapeRenderOptions = {
      x: position.x,
      y: position.y,
      type: 'desktop',
      property: {
        width: 1440,
        height: 1024
      }
    }

    this.complexShapeRendererService
      .complexShapeRenderer
      .appendDynamicComponentToContainer(DesktopPlatformComponent, options);
  }

  public handleSwitchDrop(event: CdkDragDrop<any>) {
    const { x, y } = event.dropPoint;
    const deltaX = x - this.pickupPositionInElement.x;
    const deltaY = y - this.pickupPositionInElement.y;
    const position = transform({x: deltaX, y: deltaY})(this.complexShapeRendererService.container);

    const options: ComplexShapeRenderOptions = {
      x: position.x,
      y: position.y,
      type: 'toggle',
      property: {
        width: 60,
        height: 60
      }
    }

    this.complexShapeRendererService
      .complexShapeRenderer
      .appendDynamicComponentToContainer(ToggleComponent, options);
  }

  public handleStartedPoint(event: CdkDragStart<any>, isBackground = false): void {
    // @ts-ignore
    this.pickupPositionInElement = event.source._dragRef._pickupPositionInElement;
    if (!isBackground) {
      this.scopeService.scope.setDefaultScale();
    }
  }

  public handleButtonDrop(event: CdkDragDrop<any>) {
    const { x, y } = event.dropPoint;
    const deltaX = x - this.pickupPositionInElement.x;
    const deltaY = y - this.pickupPositionInElement.y;
    const position = transform({x: deltaX, y: deltaY})(this.complexShapeRendererService.container);

    const options: ComplexShapeRenderOptions = {
      x: position.x,
      y: position.y,
      property: {
        width: 120,
        height: 48
      }
    }

    this.complexShapeRendererService
      .complexShapeRenderer
      .appendDynamicComponentToContainer(ButtonComponent, options);

  }
}
