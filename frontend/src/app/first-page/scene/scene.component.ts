import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import Parallax from 'parallax-js';
import { TabsService } from '../tabs/tabs.service';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss']
})
export class SceneComponent implements AfterViewInit {
  scene: Parallax;

  @ViewChild('scene') private sceneRef: ElementRef | undefined;
  @ViewChild('circlesCenter') private center: ElementRef | undefined;

  constructor(
    public sanitizer: DomSanitizer,
    public tabsService: TabsService
  ) {
  }

  ngAfterViewInit(): void {
    this.scene = new Parallax(this.sceneRef?.nativeElement, {
      relativeInput: true
    });

    const {x, y} = this.center?.nativeElement.getBoundingClientRect();
    this.tabsService.setCenter(x, y);
  }

  getPointOnCircle(radius: number, angle: number): [string, string] {
    const x = radius * this.cos(angle) + 'px';
    const y = radius * this.sin(angle) + 'px';
    return [x, y];
  }

  private cos(degree: number): number {
    return Math.cos(degree * (Math.PI/180));
  }

  private sin(degree: number): number {
    return Math.sin(degree * (Math.PI/180));
  }

  changeTab(index: number): void {
    this.tabsService.setTab(index);
  }

  getAngle(i: number): number {
    const startAngle = this.tabsService.quantity % 2
      ? -15 * (Math.floor(this.tabsService.quantity / 2))
      : -7.5 * (Math.floor(this.tabsService.quantity / 2));
    return startAngle + 15 * i;
  }
}
