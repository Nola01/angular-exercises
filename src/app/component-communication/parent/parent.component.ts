import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../services/communication.service';
import { ObservablesService } from '../services/observables.service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  parentMessage: string = '';
  childMessage: string = '';

  constructor(
    private communicationService: CommunicationService,
    private observablesService: ObservablesService
  ) {}

  ngOnInit() {
  }

  useService() {
    this.childMessage = this.communicationService.parentMessage;
  }

  useInput() {
    this.childMessage = 'PARENT USING INPUT PROPERTY';
    // console.log(this.message);
  }

  newMessage(msg: string) {    
    this.parentMessage = msg;
  }

  useObservable() {
    this.observablesService.parentMsg.subscribe(
      (msg) => {
        this.childMessage = msg;
      }
    )
  }

}
