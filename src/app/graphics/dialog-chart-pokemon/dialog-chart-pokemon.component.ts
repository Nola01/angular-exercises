import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-chart-pokemon',
  templateUrl: './dialog-chart-pokemon.component.html',
  styles: [
  ]
})
export class DialogChartPokemonComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {region: string}) { }

  ngOnInit(): void {
  }

}
