import { Component, OnInit } from '@angular/core';
import { ComponentContainer } from '../../../graphics/services/components-data.service';
import { ProjectHttpService } from '../../../shared/services/project-http.service';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface Project {
  uid: string;
  name: string;
  canvas: ComponentContainer[];
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  public projects$: Observable<Project[]> = this.http.getAllProject()
    .pipe(
      shareReplay(1)
    );

  constructor(private readonly http: ProjectHttpService, private readonly router: Router) {
  }

  ngOnInit(): void {
  }

  public navigateToBoard(project: Project) {
    this.router.navigate([`board/${project.uid}`]);

  }


}
