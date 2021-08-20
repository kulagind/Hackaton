import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cursor',
  templateUrl: './cursor.component.html',
  styleUrls: ['./cursor.component.scss']
})
export class CursorComponent implements OnInit {

  @Input() name: string;
  public color: string = '#7700FF';

  constructor() { }

  ngOnInit(): void {
    this.color = Math.round(Math.random()) ? '#7700FF' : '#FF4F12';
  }

}
