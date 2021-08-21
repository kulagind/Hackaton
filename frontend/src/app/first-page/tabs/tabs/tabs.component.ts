import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, NgZone, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { fromEvent, interval, ReplaySubject } from 'rxjs';
import { debounce, debounceTime, filter, map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { Center, TabsService } from '../tabs.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('first') private first: ElementRef | undefined;
  @ViewChild('second') private second: ElementRef | undefined;
  @ViewChild('third') private third: ElementRef | undefined;
  @ViewChild('fourth') private fourth: ElementRef | undefined;
  @ViewChild('tabs') private tabs: ElementRef | undefined;

  private tabsContainers: ElementRef[] = [];
  private currentTabContainer: ElementRef | undefined;

  private center: Center = {x: 0, y: 0};
  private rotation: number = 0;
  private tabsContent: ElementRef[] = [];

  private destroy$ = new ReplaySubject<void>(1);


  constructor(
    private renderer: Renderer2,
    private tabsService: TabsService,
    private ngZone: NgZone,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.currentTabContainer = this.first;
    this.tabsService.destroy();
  }

  ngAfterViewInit(): void {
    this.tabsContainers = [this.first!, this.second!, this.third!, this.fourth!];
    this.currentTabContainer = this.first;
  }

  ngOnInit(): void {
    this.setTabs();
    this.listenWheel();
    // this.changeTabsByInterval(5000);
  }

  private setTabs(): void {
    this.tabsService.center$.pipe(
      switchMap(value => {
        this.center = value;
        return this.tabsService.tabs$.pipe(take(1));
      })
    ).subscribe(tabs => {
      // @ts-ignore
      this.second?.nativeElement.style.transformOrigin = `${this.center.x}px ${this.center.y}px`;
      // @ts-ignore
      this.third?.nativeElement.style.transformOrigin = `${this.center.x}px ${this.center.y}px`;
      // @ts-ignore
      this.fourth?.nativeElement.style.transformOrigin = `${this.center.x}px ${this.center.y}px`;
      // @ts-ignore
      this.tabs?.nativeElement.style.transformOrigin = `${this.center.x}px ${this.center.y}px`;

      this.tabsContent = tabs;
      
      this.renderCurrentTab();
    });
  }

  private changeTabsByInterval(ms: number): void {
    interval(ms).pipe(takeUntil(this.destroy$)).subscribe(_ => {
      const direction = -1;
      
      this.changeCurrentTabContainer(direction);      
      this.tabsService.switchCurrentTab(direction);
      this.renderCurrentTab();

      this.rotation = this.rotation + direction * 90;
      // @ts-ignore
      this.tabs?.nativeElement.style.transform = `rotate(${this.rotation}deg)`;
    });
  }

  private listenWheel(): void {
    fromEvent<WheelEvent>(this.document, 'mousewheel').pipe(
      // @ts-ignore
      map(event => event.wheelDelta),
      filter(delta => delta > 10 || delta < -10),
      debounceTime(50),
      takeUntil(this.destroy$)
    ).subscribe(delta => {
      const direction = -(delta / Math.abs(delta));
      
      this.changeCurrentTabContainer(direction);      
      this.tabsService.switchCurrentTab(direction);
      this.renderCurrentTab();

      this.rotation = this.rotation + direction * 90;
      // @ts-ignore
      this.tabs?.nativeElement.style.transform = `rotate(${this.rotation}deg)`;
    });
  }

  private renderCurrentTab(): void {
    try {
      this.renderer.appendChild(this.currentTabContainer?.nativeElement, this.tabsContent[this.tabsService.current].nativeElement);
    } catch(e) {
      console.warn(e);
    }
  }

  private changeCurrentTabContainer(direction: number): void {
    const currentIndex = this.tabsContainers.findIndex(value => value === this.currentTabContainer);
    const nextIndex = direction > 0
      ? currentIndex === this.tabsContainers.length - 1
        ? 0
        : currentIndex + direction
      : currentIndex === 0
        ? this.tabsContainers.length - 1
        : currentIndex + direction
    this.currentTabContainer = this.tabsContainers[nextIndex];
  }
}
