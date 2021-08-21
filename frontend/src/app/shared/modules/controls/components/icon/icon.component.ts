import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {

  public value = '';

  @Input() set name(value: string) {
    this.value = value;
  };

  constructor() { }

  ngOnInit(): void {
  }

}
