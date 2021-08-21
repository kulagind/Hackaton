import { Component, OnInit } from '@angular/core';
import { ComponentContainer } from '../../../graphics/services/components-data.service';
import { ProjectHttpService } from '../../../shared/services/project-http.service';
import { BehaviorSubject, Observable, of } from 'rxjs';

export interface Project {
  id: string;
  name: string;
  Canvas: ComponentContainer[];
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  public projects$: Observable<Project[]> = new BehaviorSubject<Project[]>([{
    name: 'Умный дом',
    id: '12',
    Canvas: []
  }]).asObservable();

  // public projects$: Observable<Project[]> = this.http.getAllProject();

  constructor(private readonly http: ProjectHttpService ) {
    // this.http.createProject('Умный дом')
  }

  ngOnInit(): void {
  }


}
