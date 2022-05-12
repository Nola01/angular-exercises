import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ObservablesService {

  parentMessage$ = new EventEmitter<string>();
  childMessage$ = new EventEmitter<string>();

  constructor() { }
}
