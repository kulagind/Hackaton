import { Injectable } from '@angular/core';
import { ComponentContainer } from './components-data.service';
import safeStringify from 'fast-safe-stringify';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {
  }

  public save(data: ComponentContainer[]) {
    localStorage.setItem('components', safeStringify(data));
  }

  public getData(): ComponentContainer[] {
    return JSON.parse(localStorage.getItem('components'));
  }

}
