import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ControlsModule } from './shared/modules/controls/controls.module';
import { GraphicsModule } from './graphics/graphics.module';
import { HeaderModule } from './shared/modules/header/header.module';
import { WebsocketModule } from './shared/modules/websocket/websocket.module';
import { CursorsService } from './graphics/services/cursors.service';
import { environment } from 'src/environments/environment';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    GraphicsModule,
    BrowserModule,
    AppRoutingModule,
    ControlsModule,
    HeaderModule,
    WebsocketModule.config({
      url: environment.ws
    }),
    MatIconModule,
  ],
  providers: [
    CursorsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
