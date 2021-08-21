import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Position } from '../../classes/view-drag.class';
import { ComplexShapeRendererService } from '../../services/complex-shape-renderer.service';
import { ScopeSharerService } from '../../services/scope-sharer.service';
import { CdkDragDrop, CdkDragStart } from '@angular/cdk/drag-drop';
import { transform } from '../../functions/transform.fuction';
import { ComplexShapeRenderOptions } from '../../types/complex-shape-rendere-options.type';
import { InputComponent } from '../../../shared/modules/controls/components/input/input.component';
import { ToggleComponent } from '../../../shared/modules/controls/components/toggle/toggle.component';
import { ButtonComponent } from '../../../shared/modules/buttons/components/button/button.component';
import { bootstrap } from '../../classes/component-behavior-decorator.class';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent {

  private pickupPositionInElement: Position;

  @ViewChild('mobile')
  private readonly mobile: ElementRef<HTMLElement>;

  constructor(
    private readonly complexShapeRendererService: ComplexShapeRendererService,
    private readonly scopeService: ScopeSharerService
  ) {
  }

  public handleButtonDrop(event: CdkDragDrop<any>) {
    const { x, y } = event.dropPoint;
    const deltaX = x - this.pickupPositionInElement.x;
    const deltaY = y - this.pickupPositionInElement.y;
    const position = transform({x: bootstrap(deltaX, 8), y: bootstrap(deltaY, 16)})(this.complexShapeRendererService.container);

    const options: ComplexShapeRenderOptions = {
      x: position.x,
      y: position.y,

      type: 'button',

      property: {
        width: 120,
        height: 48
      }
    }

    this.complexShapeRendererService
      .complexShapeRenderer
      .appendDynamicComponentToContainer(ButtonComponent, options);

  }

  public handleStartedPoint(event: CdkDragStart<any>, isBackground = false): void {
    // @ts-ignore
    this.pickupPositionInElement = event.source._dragRef._pickupPositionInElement;
    if (!isBackground) {
      this.scopeService.scope.setDefaultScale();
    }
  }


}
