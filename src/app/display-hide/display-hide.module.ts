import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DisplayComponent } from './display/display.component';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
    declarations: [
        DisplayComponent
    ],
    exports: [
        DisplayComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MaterialModule
    ]
})
export class DisplayHideModule {

}