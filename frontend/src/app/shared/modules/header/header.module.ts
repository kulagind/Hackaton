import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { HeaderContentComponent } from './components/header-content/header-content.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ButtonsModule } from '../buttons/buttons.module';
import { MatRippleModule } from '@angular/material/core';



@NgModule({
  declarations: [
    HeaderComponent,
    HeaderContentComponent
  ],
  exports: [
    HeaderComponent,
    HeaderContentComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    ButtonsModule,
    MatRippleModule
  ]
})
export class HeaderModule { }
