import { Component, ElementRef, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-scrollable-chips',
  templateUrl: './scrollable-chips.component.html',
  styleUrls: ['./scrollable-chips.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useFactory: forwardRef(() => ScrollableChipsComponent),
      multi: true
    }
  ]
})
export class ScrollableChipsComponent<T> implements OnInit, ControlValueAccessor {

  @Input() chips: T[] = [];
  @Input() getTextContent = (value) => value.toString();
  @ViewChild('container') container: ElementRef;
  mouseUp = fromEvent(document, 'mouseup')
    .pipe(
      tap(() =>
        setTimeout(() => {
          this.isMouseMoved = false
        }, 0)
      )
    );
  _value: T;
  onChange: (value: T) => any;
  onTouched: () => any;
  disabled: boolean;
  previousScrollPosition = 0;
  isMouseMoved = false;

  set value(value: T) {
    this._value = value;
    if (this.onChange) {
      this.onChange(value);
    }
  }

  get value() {
    return this._value;
  }

  constructor() {
  }

  ngOnInit(): void {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(obj: T): void {
    this.value = obj;
  }

  handleMouseDown(event: MouseEvent): void {
    this.previousScrollPosition = event.screenX;
    this.isMouseMoved = false;
    this.listenMouseMove();
  }

  handleChipClick(chip: T): void {
    if (!this.isMouseMoved) {
      this.value = chip;
    }
  }

  listenMouseMove(): void {
    fromEvent(document, 'mousemove')
      .pipe(takeUntil(this.mouseUp))
      .subscribe((event: MouseEvent) => {
        this.isMouseMoved = true;
        this.container.nativeElement.scrollLeft -= event.screenX - this.previousScrollPosition;
        this.previousScrollPosition = event.screenX;
      });
  }

}
