import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunicationComponent } from './communication/communication.component';
import { ParentComponent } from './parent/parent.component';
import { ChildComponent } from './child/child.component';



@NgModule({
  declarations: [
    CommunicationComponent,
    ParentComponent,
    ChildComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentCommunicationModule { }
