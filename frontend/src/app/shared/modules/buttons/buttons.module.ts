import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonDirective } from './directives/button.directive';
import { ButtonComponent } from './components/button/button.component';



@NgModule({
  declarations: [
    ButtonDirective,
    ButtonComponent
  ],
  exports: [
    ButtonDirective
  ],
  imports: [
    CommonModule
  ]
})
export class ButtonsModule { }
