import { Inject, Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { Scope } from "../classes/view-scope.class";

@Injectable({
  providedIn: 'root'
})
export class ScopeSharerService {
  private _scope: Readonly<Scope>;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  setScope(scope: Readonly<Scope>): void {
    this._scope = scope;
    this.setScopeParams(this._scope);
  }

  get scope(): Readonly<Scope> {
    return this._scope;
  }

  private setScopeParams(scope: Readonly<Scope>): void {
    this._scope.scope$.pipe(
      debounceTime(1000)
    ).subscribe(viewBox => {
      this.router.navigate(
        [],
        {
          relativeTo: this.activatedRoute,
          queryParams: {
            viewBox: viewBox
          },
          queryParamsHandling: 'merge'
        }
      );
      
    });
  }

  public getScopeParams(): string {
    return this.activatedRoute.snapshot.queryParamMap.get('viewBox') || '';
  }
}