import { Component } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  public readonly control = new SelectionModel<string>(false, [ 'Платформа' ]);

  constructor() {
  }

}
