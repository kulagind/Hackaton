import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToggleComponent } from './components/toggle/toggle.component';
import { SliderComponent } from './components/slider/slider.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { ChipsComponent } from './components/chips/chips.component';
import { InputComponent } from './components/input/input.component';



@NgModule({
    declarations: [
        ToggleComponent,
        SliderComponent,
        CheckboxComponent,
        ChipsComponent,
        InputComponent
    ],
    exports: [
        ToggleComponent,
        InputComponent
    ],
    imports: [
        CommonModule
    ]
})
export class ControlsModule { }
