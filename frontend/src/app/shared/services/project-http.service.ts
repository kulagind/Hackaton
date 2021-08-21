import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../../projects/components/projects/projects.component';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectHttpService {

  public readonly api = 'api/projects/'

  constructor(private readonly http: HttpClient) { }

  public getAllProject(): Observable<Project[]> {
    return this.http.get<Project[]>(this.api);
  }

  public createProject(name: string): Observable<Project> {
    return this.http.post<Project>(this.api, { name, canvas: [] });
  }

  public getProject(id: string): Observable<Project> {
    return this.http.get<Project>(`${this.api}/${id}`)
  }
}
