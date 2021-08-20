import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipComponent } from './components/chip/chip.component';
import { ChipsContainerComponent } from './components/chips-container/chips-container.component';

@NgModule({
  declarations: [
    ChipComponent,
    ChipsContainerComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ChipsModule {
}
