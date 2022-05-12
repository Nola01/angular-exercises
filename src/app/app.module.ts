import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DisplayHideModule } from './display-hide/display-hide.module';
import { ComponentCommunicationModule } from './component-communication/component-communication.module';
import { MainPageModule } from './main-page/main-page.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    MainPageModule,
    DisplayHideModule,
    ComponentCommunicationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
