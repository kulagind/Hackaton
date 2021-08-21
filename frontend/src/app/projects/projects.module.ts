import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './components/project/project.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ButtonsModule } from '../shared/modules/buttons/buttons.module';
import { MatRippleModule } from '@angular/material/core';
import { ControlsModule } from '../shared/modules/controls/controls.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProjectComponent,
    ProjectsComponent
  ],
  imports: [
    CommonModule,
    ButtonsModule,
    MatRippleModule,
    ControlsModule,
    ReactiveFormsModule
  ],
  bootstrap: [ProjectsComponent]
})
export class ProjectsModule { }
