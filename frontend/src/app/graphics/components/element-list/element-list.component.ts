import { Component, OnInit } from '@angular/core';
import { GlobalDataService, SnapshotObserverService } from '../../services/snapshot-observer.service';
import { Observable } from 'rxjs';
import { ComponentContainer } from '../../services/components-data.service';
import { shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-element-list',
  templateUrl: './element-list.component.html',
  styleUrls: ['./element-list.component.scss']
})
export class ElementListComponent implements OnInit {

  public elements$: Observable<ComponentContainer[]> = this.observerService.components$

  constructor(private readonly observerService: SnapshotObserverService) {
  }

  ngOnInit(): void {
  }

  public delete(element: ComponentContainer) {
    const component = document.getElementById(element.options.id);
    component.parentNode.removeChild(component)
    GlobalDataService.changes$.next();
  }

  public setViewOnComponent(component: ComponentContainer) {
    GlobalDataService.setViewOnElement.next({
      x: component.options.x,
      y: component.options.y
    })

  }
}
