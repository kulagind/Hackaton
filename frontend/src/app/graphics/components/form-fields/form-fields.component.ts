import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Position } from '../../classes/view-drag.class';
import { ComplexShapeRendererService } from '../../services/complex-shape-renderer.service';
import { ScopeSharerService } from '../../services/scope-sharer.service';
import { CdkDragDrop, CdkDragStart } from '@angular/cdk/drag-drop';
import { transform } from '../../functions/transform.fuction';
import { ComplexShapeRenderOptions } from '../../types/complex-shape-rendere-options.type';
import { MobilePlatformComponent } from '../platform/components/mobile-platform/mobile-platform.component';
import { DesktopPlatformComponent } from '../platform/components/desktop-platform/desktop-platform.component';
import { ToggleComponent } from '../../../shared/modules/controls/components/toggle/toggle.component';
import { ButtonComponent } from '../../../shared/modules/buttons/components/button/button.component';
import { InputComponent } from '../../../shared/modules/controls/components/input/input.component';
import { SelectComponent } from 'src/app/shared/modules/controls/components/select/select.component';

@Component({
  selector: 'app-form-fields',
  templateUrl: './form-fields.component.html',
  styleUrls: ['./form-fields.component.scss']
})
export class FormFieldsComponent {

  private pickupPositionInElement: Position;

  @ViewChild('mobile')
  private readonly mobile: ElementRef<HTMLElement>;

  constructor(
    private readonly complexShapeRendererService: ComplexShapeRendererService,
    private readonly scopeService: ScopeSharerService
  ) {
  }

  public handleInputDrop(event: CdkDragDrop<any>) {
    const { x, y } = event.dropPoint;
    const deltaX = x - this.pickupPositionInElement.x;
    const deltaY = y - this.pickupPositionInElement.y;
    const position = transform({x: deltaX, y: deltaY})(this.complexShapeRendererService.container);

    const options: ComplexShapeRenderOptions = {
      x: position.x,
      y: position.y,

      type: 'input',

      property: {
        width: 280,
        height: 48
      }
    }

    this.complexShapeRendererService
      .complexShapeRenderer
      .appendDynamicComponentToContainer(InputComponent, options);
  }

  public handleSelectorDrop(event: CdkDragDrop<any>) {
    const { x, y } = event.dropPoint;
    const deltaX = x - this.pickupPositionInElement.x;
    const deltaY = y - this.pickupPositionInElement.y;
    const position = transform({x: deltaX, y: deltaY})(this.complexShapeRendererService.container);

    const options: ComplexShapeRenderOptions = {
      x: position.x,
      y: position.y,

      type: 'input',

      property: {
        width: 280,
        height: 48
      }
    }

    this.complexShapeRendererService
      .complexShapeRenderer
      .appendDynamicComponentToContainer(SelectComponent, options);
  }

  public handleStartedPoint(event: CdkDragStart<any>, isBackground = false): void {
    // @ts-ignore
    this.pickupPositionInElement = event.source._dragRef._pickupPositionInElement;
    if (!isBackground) {
      this.scopeService.scope.setDefaultScale();
    }
  }

}
