import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ParentComponent } from '../parent/parent.component';
import { CommunicationService } from '../services/communication.service';
import { ObservablesService } from '../services/observables.service';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit{

  isParent: boolean = false;

  @Input() childMessage: string = '';

  @Output() onNewMessage: EventEmitter<string> = new EventEmitter();

  constructor(
    private communicationService: CommunicationService, 
    private parentComponent: ParentComponent,
    private observablesService: ObservablesService
  ) {}

  ngOnInit() {
    this.observablesService.parentMessage$.subscribe(message => {
      this.childMessage = message;
    })
  }

  useService() {
    this.parentComponent.parentMessage = this.communicationService.childMessage;
  }

  useOutput() {
    this.onNewMessage.emit()
  }

  useObservable() {
    this.observablesService.childMessage$.emit('CHILD USING SUBJECT');
  }

}
