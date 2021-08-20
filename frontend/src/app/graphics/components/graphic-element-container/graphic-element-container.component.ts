import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graphic-element-container',
  templateUrl: './graphic-element-container.component.html',
  styleUrls: ['./graphic-element-container.component.scss']
})
export class GraphicElementContainerComponent implements OnInit {

  public readonly elementMetaData: NonNullable<GraphicElementMetaData>
    = defaultGraphicElementMetaDataFactory();

  constructor() { }

  ngOnInit(): void {}

}

export type GraphicElementMetaData<T = any> = {
  x: Readonly<number>;
  y: Readonly<number>;
  z?: Readonly<number>

  property: {
    width: Readonly<number>;
    height: Readonly<number>;
  }
}

export function defaultGraphicElementMetaDataFactory(): GraphicElementMetaData {
  return {
    x: 0,
    y: 0,
    property: {
      width: 100,
      height: 100
    }
  }
}
