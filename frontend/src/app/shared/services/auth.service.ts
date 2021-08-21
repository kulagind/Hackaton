import { Injectable } from '@angular/core';
import { LocalStorageService } from 'src/app/graphics/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _defaultName: string = 'Anonymus' + Date.now();
  private _name: string = 'Anonymus' + Date.now();

  constructor(
    private localStorage: LocalStorageService
  ) {
    this._name = this.localStorage.getName() || this._defaultName;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
    this.localStorage.saveName(name || this._defaultName);
  }
}
