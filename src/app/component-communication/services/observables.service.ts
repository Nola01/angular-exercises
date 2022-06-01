import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Observer, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObservablesService {

  // parentMsg = of('PARENT USING SUBJECT')

  parentMsgSubscriber(observer: Observer<string>) {
    observer.next('PARENT USING SUBJECT');
    return {unsubscribe() {}};
  }

  parentMsg = new Observable(this.parentMsgSubscriber);

  childMsgSubscriber(observer: Observer<string>) {
    observer.next('CHILD USING SUBJECT');
    return {unsubscribe() {}};
  }

  childMsg = new Observable(this.childMsgSubscriber);

  constructor() { }
}
