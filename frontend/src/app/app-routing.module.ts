import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './graphics/components/board/board.component';
import { ProjectsComponent } from './projects/components/projects/projects.component';

const routes: Routes = [
  { path: 'board', component: BoardComponent },
  { path: 'projects', component: ProjectsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
