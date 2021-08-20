import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderModule } from './modules/header/header.module';
import { BadgeComponent } from './components/badge/badge.component';

@NgModule({
  imports: [
    CommonModule,
    HeaderModule,
  ],
  exports: [
    BadgeComponent,
  ],
  declarations: [
    BadgeComponent,
  ]
})
export class SharedModule {
}
