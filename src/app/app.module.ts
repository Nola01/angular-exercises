import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DisplayHideModule } from './display-hide/display-hide.module';
import { ComponentCommunicationModule } from './component-communication/component-communication.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DisplayHideModule,
    ComponentCommunicationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
