import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './first-page/welcome/welcome.component';
import { BoardComponent } from './graphics/components/board/board.component';
import { ProjectsComponent } from './projects/components/projects/projects.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'board/:id', component: BoardComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: '**', component: ProjectsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
