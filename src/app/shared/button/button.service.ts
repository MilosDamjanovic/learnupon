import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ButtonService {

  constructor() { }

  public createBtn = (x: any) => (y: any) => (z: any) => (j: any) => ({ ...x, ...y, ...z, ...j });

  public createImageBtn = (x: any) => (y: any) => (z: any) => (j: any) => ({ ...x, ...y, ...z, ...j });

}
