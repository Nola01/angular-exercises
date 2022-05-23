import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { LightsComponent } from './lights/lights.component';




@NgModule({
  declarations: [
    LightsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class LightSwitchModule { }
