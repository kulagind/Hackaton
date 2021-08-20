import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollableChipsComponent } from './scrollable-chips/scrollable-chips.component';
import { ChipComponent } from './chip/chip.component';



@NgModule({
  declarations: [
    ScrollableChipsComponent,
    ChipComponent
  ],
  exports: [
    ScrollableChipsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ScrollableChipsModule { }
