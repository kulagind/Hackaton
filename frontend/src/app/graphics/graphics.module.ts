import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './components/board/board.component';
import { ControlsModule } from '../shared/modules/controls/controls.module';
import { GraphicElementContainerComponent } from './components/graphic-element-container/graphic-element-container.component';
import { CursorComponent } from './components/cursor/cursor.component';
import { ButtonsModule } from '../shared/modules/buttons/buttons.module';
import { ScrollableChipsModule } from '../shared/modules/scrollable-chips/scrollable-chips.module';
import { SharedModule } from '../shared/shared.module';
import { GraphicComponentContainerContentComponent } from './components/graphic-component-container-content/graphic-component-container-content.component';
import { GraphicComponentContainerDescriptionComponent } from './components/graphic-component-container-description/graphic-component-container-description.component';
import { GraphicComponentContainerNameComponent } from './components/graphic-component-container-name/graphic-component-container-name.component';
import { GraphicComponentContainerComponent } from './components/graphic-component-container/graphic-component-container.component';
import { PlatformComponent } from './components/platform/platform.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MobilePlatformComponent } from './components/platform/components/mobile-platform/mobile-platform.component';
import { DesktopPlatformComponent } from './components/platform/components/desktop-platform/desktop-platform.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ChipsModule } from '../shared/modules/chips/chips.module';
import { FormFieldsComponent } from './components/form-fields/form-fields.component';
import { ControlsComponent } from './components/controls/controls.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRippleModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { TextsComponent } from './components/text/text.component';
import { IconsComponent } from './components/icons/icons.component';
import { ElementListComponent } from './components/element-list/element-list.component';
import { CommentComponent } from './components/comment/comment.component';
import { CommentContainerComponent } from './components/comment-container/comment-container.component';


@NgModule({
  declarations: [
    BoardComponent,
    GraphicElementContainerComponent,
    GraphicComponentContainerContentComponent,
    GraphicComponentContainerDescriptionComponent,
    GraphicComponentContainerNameComponent,
    CursorComponent,
    SidebarComponent,
    GraphicComponentContainerComponent,
    PlatformComponent,
    MobilePlatformComponent,
    DesktopPlatformComponent,
    ToolbarComponent,
    FormFieldsComponent,
    ControlsComponent,
    ButtonsComponent,
    TextsComponent,
    IconsComponent,
    ElementListComponent,
    CommentComponent,
    CommentContainerComponent,
  ],
  imports: [
    CommonModule,
    ControlsModule,
    ButtonsModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    DragDropModule,
    ChipsModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    HttpClientModule,
    MatRippleModule
  ],
  bootstrap: [BoardComponent]
})
export class GraphicsModule {
}
