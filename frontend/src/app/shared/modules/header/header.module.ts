import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { HeaderContentComponent } from './components/header-content/header-content.component';



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
    CommonModule
  ]
})
export class HeaderModule { }
