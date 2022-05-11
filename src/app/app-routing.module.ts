import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayComponent } from './display-hide/display/display.component';
import { CommunicationComponent } from './component-communication/communication/communication.component';


const routes: Routes = [
  { path: 'display-hide', component: DisplayComponent },
  { path: 'component-communication', component: CommunicationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
