import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  private _parentMessage: string = 'PARENT USING SERVICE';
  private _childMessage: string = 'CHILD USING SERVICE';

  get parentMessage(): string {
    return this._parentMessage;
  }

  get childMessage(): string {
    return this._childMessage;
  }

  constructor() { }



}
