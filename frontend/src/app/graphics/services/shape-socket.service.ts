import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { fromEvent, ReplaySubject, SubscriptionLike } from 'rxjs';
import { filter, map, throttleTime } from 'rxjs/operators';
import { EVENT } from '../../shared/modules/websocket/events';
import { WebsocketService } from '../../shared/modules/websocket/websocket.service';
import { AuthService } from '../../shared/services/auth.service';
import { ComplexShapeRendererService } from './complex-shape-renderer.service';

export interface Cursor {
  id: string,
  x: number,
  y: number
}

@Injectable({
  providedIn: 'root'
})
export class ShapeSocketService {

  private subOn: SubscriptionLike;
  private subSend: SubscriptionLike;
  private _cursors: Map<string, ReplaySubject<Cursor>> = new Map();
  private cursorOwners: ReplaySubject<string[]> = new ReplaySubject(1);
  private _cursorOwners: string[] = [];  

  public isCoop: boolean = true;

  constructor(
    @Inject(DOCUMENT) private document,
    private ws: WebsocketService,
    private authService: AuthService,
    private complexShapeRenderer: ComplexShapeRendererService
  ) {
  }

  connect(svgContainer: SVGSVGElement): void {
    const mousePoint = svgContainer.createSVGPoint();

    this.subOn = this.ws.on<Cursor>(EVENT.cursor).pipe(
      filter(cursor => cursor.name !== this.authService.name)
    ).subscribe(cursor => {
      if (cursor.name.trim()) {
        if (this._cursorOwners.includes(cursor.name) && this._cursors.has(cursor.name)) {
          this._cursors.get(cursor.name).next(cursor);
        } else {
          const subj = new ReplaySubject<Cursor>(1);
          subj.next(cursor);
          this._cursors.set(cursor.name, subj);
          this._cursorOwners.push(cursor.name);
          this.cursorOwners.next(this._cursorOwners);
        }
      }
    });

    this.subSend = fromEvent<MouseEvent>(this.document, 'mousemove').pipe(
      filter(_ => this.ws.connected),
      throttleTime(33),
      map(event => {
        mousePoint.x = event.clientX;
        mousePoint.y = event.clientY;
        return mousePoint.matrixTransform(svgContainer.getScreenCTM().inverse())
      })
    ).subscribe(event => {
      this.ws.send(EVENT.cursor, {x: event.x, y: event.y, name: this.authService.name});
    });
  }

  get status(): boolean {
    return this.ws.connected;
  }

  disconnect(): void {
    if (this.subOn) {
      this.subOn.unsubscribe();
    }
    if (this.subSend) {
      this.subSend.unsubscribe();
    }
    this.ws.disconnect();
    this._cursorOwners = [];
    this.cursorOwners.next(this._cursorOwners);
  }

  getCursorByName(name: string): ReplaySubject<Cursor> {
    return this._cursors.get(name);
  }

  get cursorOwners$(): Observable<string[]> {
    return this.cursorOwners.asObservable();
  }

  changeCoopMode(): void {
    this.isCoop = !this.isCoop;
    if (!this.isCoop) {
      this.disconnect();
    } else {
      this.ws.createConnection();
      this.connect(this.complexShapeRenderer.container);
    }
  }
}
