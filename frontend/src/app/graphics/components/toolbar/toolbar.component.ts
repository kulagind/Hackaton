import { Component, OnInit } from '@angular/core';
import { CursorsService } from '../../services/cursors.service';

export const globalOptions = {
  bootstrap: true,
};

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  public readonly globalOptions = globalOptions;

  constructor(public cursorsService: CursorsService,) { }

  ngOnInit(): void {
  }

  public switchBootstrap() {
    globalOptions.bootstrap = !globalOptions.bootstrap;
  }

}
