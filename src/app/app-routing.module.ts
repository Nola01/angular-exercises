import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommunicationComponent } from './component-communication/communication/communication.component';
import { DisplayComponent } from './display-hide/display/display.component';
import { LightsComponent } from './light-switch/lights/lights.component';
import { CrudMainPageComponent } from './crud/crud-main-page/crud-main-page.component';
import { GraphMainPageComponent } from './graphics/graph-main-page/graph-main-page.component';


const routes: Routes = [
  { path: 'display-hide', component: DisplayComponent },
  { path: 'component-communication', component: CommunicationComponent },
  { path: 'crud', component: CrudMainPageComponent },
  { path: 'lights', component: LightsComponent },
  { path: 'graphics', component: GraphMainPageComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
