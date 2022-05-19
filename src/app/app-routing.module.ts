import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommunicationComponent } from './component-communication/communication/communication.component';
import { DisplayComponent } from './display-hide/display/display.component';
import { ListComponent } from './crud/list/list.component';

const routes: Routes = [
  { path: 'display-hide', component: DisplayComponent },
  { path: 'component-communication', component: CommunicationComponent },
  { path: 'crud', component: ListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
