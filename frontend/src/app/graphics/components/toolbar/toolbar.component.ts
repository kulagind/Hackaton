import { Component, OnInit } from '@angular/core';
import { CursorsService } from '../../services/cursors.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { Position } from '../../classes/view-drag.class';
import { GlobalDataService } from '../../services/snapshot-observer.service';

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
  public readonly toolbarIsOpen$ = GlobalDataService.toggleToolbar$;

  constructor(public cursorsService: CursorsService,) { }

  ngOnInit(): void {
  }

  public switchBootstrap() {
    globalOptions.bootstrap = !globalOptions.bootstrap;
  }

  public toggleToolbar() {
    GlobalDataService.toggleToolbar$.next(!GlobalDataService.toggleToolbar$.value)
  }
}
