import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';

import { CrudModule } from './crud/crud.module';
import { ComponentCommunicationModule } from './component-communication/component-communication.module';
import { DisplayHideModule } from './display-hide/display-hide.module';
import { HttpClientModule } from "@angular/common/http";
import { LightSwitchModule } from './light-switch/light-switch.module';
import { MainPageModule } from './main-page/main-page.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ComponentCommunicationModule,
    CrudModule,
    DisplayHideModule,
    HttpClientModule,
    LightSwitchModule,
    MainPageModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
