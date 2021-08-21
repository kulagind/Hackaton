import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './components/project/project.component';
import { ProjectsComponent } from './components/projects/projects.component';



@NgModule({
  declarations: [
    ProjectComponent,
    ProjectsComponent
  ],
  imports: [
    CommonModule
  ],
  bootstrap: [ProjectsComponent]
})
export class ProjectsModule { }
