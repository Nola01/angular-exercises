import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {

  // @ViewChild('link1') link1!: ElementRef<HTMLInputElement>;
  // isPressed: boolean = false;

  // pressed() {
  //   if (!this.isPressed) {
  //     this.isPressed = true;
  //     this.link1.nativeElement.style.color = "#ffffff";
  //     this.link1.nativeElement.style.backgroundColor = "#0075AD";
  //   } else {
  //     this.isPressed = false;
  //     this.link1.nativeElement.style.color = "#0075AD";
  //     this.link1.nativeElement.style.backgroundColor = "#FA9214";
  //     this.link1.nativeElement.style.borderRadius = "5px";
  //   }
  // }

}
