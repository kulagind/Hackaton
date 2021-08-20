import { AfterViewInit, Component, ContentChildren, ElementRef, Input, QueryList, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { ChipComponent } from '../chip/chip.component';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-chips-container',
  templateUrl: './chips-container.component.html',
  styleUrls: ['./chips-container.component.scss']
})
export class ChipsContainerComponent<T> implements AfterViewInit {
  @ViewChild('container')
  public readonly container: ElementRef;

  @Input()
  public control: SelectionModel<string>;

  public previousScrollPosition = 0;
  public isMouseMoved = false;
  public readonly mouseUp = fromEvent(document, 'mouseup')
    .pipe(
      tap(() =>
        setTimeout(() => {
          this.isMouseMoved = false
        }, 0)
      )
    );

  @ContentChildren(ChipComponent)
  public readonly chips: QueryList<ChipComponent>;

  public ngAfterViewInit() {
    console.log(this.control)
    this.chips.forEach(chip => chip.control = this.control);
  }

  public handleMouseDown(event: MouseEvent): void {
    this.previousScrollPosition = event.screenX;
    this.isMouseMoved = false;
    this.listenMouseMove();
  }


  public listenMouseMove(): void {
    fromEvent(document, 'mousemove')
      .pipe(takeUntil(this.mouseUp))
      .subscribe((event: MouseEvent) => {
        this.isMouseMoved = true;
        this.container.nativeElement.scrollLeft -= event.screenX - this.previousScrollPosition;
        this.previousScrollPosition = event.screenX;
      });
  }

}
