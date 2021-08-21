import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { globalOptions } from '../../../toolbar/toolbar.component';

@Component({
  selector: 'app-desktop-platform',
  templateUrl: './desktop-platform.component.html',
  styleUrls: ['./desktop-platform.component.scss']
})
export class DesktopPlatformComponent {

  public readonly globalOptions = globalOptions;

}
