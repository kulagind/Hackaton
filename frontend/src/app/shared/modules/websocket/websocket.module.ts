import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { WebsocketService } from './websocket.service';
import { WebSocketConfig } from './interfaces';
import { config } from './config';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    WebsocketService
  ]
})
export class WebsocketModule {
  public static config(wsConfig: WebSocketConfig): ModuleWithProviders {
      return {
          ngModule: WebsocketModule,
          providers: [{ provide: config, useValue: wsConfig }]
      };
  }
}
