import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-lights',
  templateUrl: './lights.component.html',
  styleUrls: ['./lights.component.css']
})
export class LightsComponent {

  colors: string[] = ['rojo', 'amarillo', 'verde'];

  isOn: boolean = false;

  isRed: boolean = false;
  isYellow: boolean = false;
  isGreen: boolean = false;

  changeColor(option: MatSelectChange) {
    // console.log(option.value);
    if (option.value == 'rojo') {
      this.isRed = true;
      this.isYellow = false;
      this.isGreen = false;
    } else if (option.value == 'amarillo') {
      this.isYellow = true;
      this.isRed = false;
      this.isGreen = false;
    } else {
      this.isGreen = true;
      this.isRed = false;
      this.isYellow = false;
    }
  }

  switchOn() {
    if (this.isOn) {
      this.isOn = false;
    } else {
      this.isOn = true;
    }
    // console.log(this.isOn);
    
  }

}
