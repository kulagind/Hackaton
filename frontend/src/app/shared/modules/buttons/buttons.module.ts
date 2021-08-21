import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonDirective } from './directives/button.directive';
import { ButtonComponent } from './components/button/button.component';
import { MatRippleModule } from '@angular/material/core';



@NgModule({
  declarations: [
    ButtonDirective,
    ButtonComponent
  ],
    exports: [
        ButtonDirective,
        ButtonComponent
    ],
    imports: [
        CommonModule,
        MatRippleModule
    ]
})
export class ButtonsModule { }
