import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  OnDestroy,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { Scope } from '../../classes/view-scope.class';
import { ComplexShapeRendererService } from '../../services/complex-shape-renderer.service';
import { ComponentsDataService } from '../../services/components-data.service';
import { SnapshotObserverService } from '../../services/snapshot-observer.service';
import { ScopeSharerService } from '../../services/scope-sharer.service';
import { types } from '../../classes/complex-shape-renderer.class';
import { LocalStorageService } from '../../services/local-storage.service';
import { CursorsService } from '../../services/cursors.service';
import { ProjectHttpService } from '../../../shared/services/project-http.service';
import { ActivatedRoute } from '@angular/router';
import { pluck, tap } from 'rxjs/operators';
import { Project } from '../../../projects/components/projects/projects.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements AfterViewInit, OnDestroy {

  private scope!: NonNullable<Readonly<Scope>>;
  private project: Project;

  constructor(
    private readonly snapshotObserverService: SnapshotObserverService,
    private readonly componentsDataService: ComponentsDataService,
    private readonly local: LocalStorageService,
    private readonly complexShapeRendererService: ComplexShapeRendererService,
    private readonly factory: ComponentFactoryResolver,
    private readonly projectHttp: ProjectHttpService,
    private readonly router: ActivatedRoute,
    private scopeService: ScopeSharerService,
    public readonly cursorsService: CursorsService
  ) {
  }

  @ViewChild('container')
  private readonly container!: ElementRef<SVGSVGElement>;

  @ViewChild('container', { read: ViewContainerRef })
  private readonly target!: ViewContainerRef;

  public ngAfterViewInit() {
    const viewBox = this.scopeService.getScopeParams();
    this.scope = new Scope(this.container.nativeElement, viewBox);
    this.scopeService.setScope(this.scope);
    this.cursorsService.connect(this.container.nativeElement);
    this.snapshotObserverService
      .build(this.container.nativeElement);

    this.complexShapeRendererService
      .buildComponentFactory(this.target)
      .buildShapeRenderer(this.container.nativeElement)

    this.initialComponentsRender();
    this.snapshotObserverService.processInfinityObserve();

    this.snapshotObserverService.components$
      .subscribe(components => {
        this.projectHttp.updateProject({
          name: this.project.name,
          uid: this.project.uid,
          canvas: components,
        }).subscribe()
      })

  }

  ngOnDestroy(): void {
    this.cursorsService.disconnect();
  }

  private initialComponentsRender() {

    const query = this.router.snapshot.paramMap.get('id');

    this.projectHttp.getProject(query)
      .pipe(
        tap(project => this.project = project),
        pluck('canvas')
      )
      .subscribe(components => {
        if (components) {
          for (const component of components) {
            this.complexShapeRendererService.complexShapeRenderer
              .appendDynamicComponentToContainer(types[component.component] as any, component.options)
          }
        }
      });
  }

}
