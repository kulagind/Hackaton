import { Component, OnInit } from '@angular/core';
import { CursorsService } from '../../services/cursors.service';
import { GlobalDataService } from '../../services/snapshot-observer.service';

export const globalOptions = {
  bootstrap: false,
  comment: false,
};

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  public readonly globalOptions = globalOptions;
  public readonly toolbarIsOpen$ = GlobalDataService.toggleToolbar$;

  constructor(public cursorsService: CursorsService,) {
  }

  ngOnInit(): void {
  }

  public switchBootstrap() {
    globalOptions.bootstrap = !globalOptions.bootstrap;
  }

  public toggleToolbar() {
    GlobalDataService.toggleToolbar$.next(!GlobalDataService.toggleToolbar$.value)
  }

  public toggleComment() {
    globalOptions.comment = !globalOptions.comment
  }
}
