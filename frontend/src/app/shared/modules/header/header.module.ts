import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { HeaderContentComponent } from './components/header-content/header-content.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';



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
        MatButtonModule
    ]
})
export class HeaderModule { }
