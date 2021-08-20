import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipComponent } from './components/chip/chip.component';
import { ChipsContainerComponent } from './components/chips-container/chips-container.component';

@NgModule({
    declarations: [
        ChipComponent,
        ChipsContainerComponent
    ],
  exports: [
    ChipsContainerComponent,
    ChipComponent
  ],
    imports: [
        CommonModule
    ]
})
export class ChipsModule {
}
