import { Component, Input } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-graphic-component-container',
  templateUrl: './graphic-component-container.component.html',
  styleUrls: ['./graphic-component-container.component.scss']
})
export class GraphicComponentContainerComponent {

  public control = new SelectionModel(false, ['light']);

  @Input()
  public isDark: boolean = false;

  constructor() {
  }
}
