import { ElementRef, Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

export type Center = {x: number, y: number};

@Injectable({
  providedIn: 'root'
})
export class TabsService {

  public current: number = 0;
  public quantity: number = 0;
  private _tabs: ElementRef[] = [];
  private _center: Center = {x: 0, y: 0};
  private center: ReplaySubject<Center> = new ReplaySubject(1);
  private tabs: ReplaySubject<ElementRef[]> = new ReplaySubject(1);
  private changedCurrentTab: ReplaySubject<number> = new ReplaySubject(1);

  constructor() {
  }

  register(elRef: ElementRef): void {
    this._tabs.push(elRef);
    this.quantity = this._tabs.length;
    this.tabs.next(this._tabs);
  }

  setCenter(x: number, y: number): void {
    this._center = {x, y};
    this.center.next(this._center);
  }

  get center$(): Observable<Center> {
    return this.center.asObservable();
  }

  get tabs$(): Observable<ElementRef[]> {
    return this.tabs.asObservable().pipe(debounceTime(50));
  }

  get currentTabChanged$(): Observable<number> {
    return this.changedCurrentTab.asObservable();
  }

  switchCurrentTab(direction: number): void {
    this.current+= direction;
    if (this.current < 0) {
      this.current = this.quantity - 1;
    }
    if (this.current >= this.quantity) {
      this.current = 0;
    }    
  }

  getTabs(): ElementRef[] {
    return this._tabs;
  }

  setTab(index: number): void {
    this.changedCurrentTab.next(index);
  }

  destroy(): void {
    this._tabs = [];
    this.current = 0;
    this.quantity = 0;
  }
}
