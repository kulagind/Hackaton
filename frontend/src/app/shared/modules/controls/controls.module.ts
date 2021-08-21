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
import { IconComponent } from './components/icon/icon.component';
import { HeaderComponent } from './components/header/header.component';
import { TextComponent } from './components/text/text.component';
import { DarkToggleComponent } from './components/dark-toggle/dark-toggle.component';


@NgModule({
  declarations: [
    ToggleComponent,
    SliderComponent,
    CheckboxComponent,
    ChipsComponent,
    InputComponent,
    SelectComponent,
    IconComponent,
    DarkToggleComponent,
    HeaderComponent,
    TextComponent,
  ],
  exports: [
    ToggleComponent,
    InputComponent,
    SelectComponent,
    IconComponent,
    DarkToggleComponent,
    HeaderComponent,
    TextComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule
  ]
})
export class ControlsModule {
}
