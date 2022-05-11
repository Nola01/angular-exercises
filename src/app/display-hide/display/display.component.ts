import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent {

  show: boolean = true;

  showOrHide() {
    if (this.show) {
      this.show = false;
    } else {
      this.show = true;
    }
  }

}
