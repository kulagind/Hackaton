import { Component, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit, ControlValueAccessor {

  public isList: boolean = false;
  public choosen: string = '';

    onChange: (value: any) => any;
    onTouched: () => any;
  
    constructor() { }
  
    ngOnInit(): void {
    }
  
    registerOnChange(fn: any): void {
      this.onChange = fn;
    }
  
    registerOnTouched(fn: any): void {
      this.onTouched = fn;
    }
  
    writeValue(obj: any): void {
    }

    openList(): void {
      this.isList = !this.isList;
      this.choosen = '';
    }

    setChoosen(value: string): void {
      this.choosen = value;
      this.isList = false;
    }

}
