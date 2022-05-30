import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommunicationComponent } from './component-communication/communication/communication.component';
import { DisplayComponent } from './display-hide/display/display.component';
import { LightsComponent } from './light-switch/lights/lights.component';
import { CrudMainPageComponent } from './crud/crud-main-page/crud-main-page.component';


const routes: Routes = [
  { path: 'display-hide', component: DisplayComponent },
  { path: 'component-communication', component: CommunicationComponent },
  { path: 'crud', component: CrudMainPageComponent },
  { path: 'lights', component: LightsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
