import { Directive, ElementRef, OnDestroy } from '@angular/core';
import { TabsService } from './tabs.service';

@Directive({
  selector: '[appTab]'
})
export class TabDirective {

  constructor(
    elRef: ElementRef,
    private tabsService: TabsService
  ) {    
    this.tabsService.register(elRef);  
  }
}
