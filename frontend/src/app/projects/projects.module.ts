import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './components/project/project.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ButtonsModule } from '../shared/modules/buttons/buttons.module';
import { MatRippleModule } from '@angular/material/core';



@NgModule({
  declarations: [
    ProjectComponent,
    ProjectsComponent
  ],
  imports: [
    CommonModule,
    ButtonsModule,
    MatRippleModule
  ],
  bootstrap: [ProjectsComponent]
})
export class ProjectsModule { }
