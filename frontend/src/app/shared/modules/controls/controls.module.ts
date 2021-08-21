import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToggleComponent } from './components/toggle/toggle.component';
import { SliderComponent } from './components/slider/slider.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { ChipsComponent } from './components/chips/chips.component';
import { InputComponent } from './components/input/input.component';
import { SelectComponent } from './components/select/select.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
    declarations: [
        ToggleComponent,
        SliderComponent,
        CheckboxComponent,
        ChipsComponent,
        InputComponent,
        SelectComponent,
    ],
    exports: [
        ToggleComponent,
        InputComponent,
        SelectComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatIconModule
    ]
})
export class ControlsModule { }
