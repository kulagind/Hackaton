import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ControlsModule } from './shared/modules/controls/controls.module';
import { GraphicsModule } from './graphics/graphics.module';
import { HeaderModule } from './shared/modules/header/header.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    GraphicsModule,
    BrowserModule,
    AppRoutingModule,
    ControlsModule,
    HeaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
