import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Subject, Observable, switchMap, tap } from 'rxjs';

import { DialogData } from '../interfaces/dialog.interfaces';

import { GraphicsService } from '../services/graphics.service';
import { ShortCountry } from '../interfaces/countries.interfaces';
import { Result, RegionPokemon, MainGeneration } from '../interfaces/pokemon.interfaces';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogChartPokemonComponent } from '../dialog-chart-pokemon/dialog-chart-pokemon.component';


@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styles: [
  ]
})
export class BarChartComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  regions: string[] = []
  regionsInfoUrls: string[] = []
  pokedexUrls: string[] = []

  kantoPokemonList: string[] = []
  johtoPokemonList: string[] = []
  hoennPokemonList: string[] = []
  sinnohPokemonList: string[] = []
  unovaPokemonList: string[] = []
  kalosPokemonList: string[] = []
  alolaPokemonList: string[] = []
  galarPokemonList: string[] = []

  kantoLocationsList: MainGeneration[] = []
  johtoLocationsList: MainGeneration[] = []
  hoennLocationsList: MainGeneration[] = []
  sinnohLocationsList: MainGeneration[] = []
  unovaLocationsList: MainGeneration[] = []
  kalosLocationsList: MainGeneration[] = []
  alolaLocationsList: MainGeneration[] = []
  galarLocationsList: MainGeneration[] = []


  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };
  public barChartType: ChartType = 'bar';
  

  public barChartData: ChartData<'bar'> = {
    labels: this.regions,
    datasets: [
      { 
        data: [ ], 
        label: 'Número de pokemons por región', backgroundColor: '#FAC287', hoverBackgroundColor: '#FAE7BD', borderWidth: 1, borderColor: '#000000', hoverBorderColor: '#000000' 
      },
      { 
        data: [ ], 
        label: 'Localizaciones por región', backgroundColor: '#4DB8E3', hoverBackgroundColor: '#B2D5FA', borderWidth: 1, borderColor: '#000000', hoverBorderColor: '#000000'
      }
    ]
  };

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    this.openDialog()
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    // console.log(event, active);
  }

  constructor(private graphicsService: GraphicsService, public dialog: MatDialog) { }

  ngOnInit(): void {
    
    this.graphicsService.getRegions().pipe(
      switchMap(data => {
        // console.log(data);
        const results: Result[] = data.results;
        results.map(region => {
          this.regions.push(region.name.toUpperCase())
          this.regionsInfoUrls.push(region.url)
        })
        
        return this.graphicsService.getRegionsInfo(this.regionsInfoUrls)
      }),
      switchMap(regionInfo => {
        switch (regionInfo.name) {
          case 'kanto':
            this.kantoLocationsList = regionInfo.locations
            break;
          case 'johto':
            this.johtoLocationsList = regionInfo.locations
            break;
          case 'hoenn':
            this.hoennLocationsList = regionInfo.locations
            break;
          case 'sinnoh':
            this.sinnohLocationsList = regionInfo.locations
            break;
          case 'unova':
            this.unovaLocationsList = regionInfo.locations
            break;
          case 'kalos':
            this.kalosLocationsList = regionInfo.locations
            break;
          case 'alola':
            this.alolaLocationsList = regionInfo.locations
            break;
          case 'galar':
            this.galarLocationsList = regionInfo.locations
            break;
          default:
            break;
        }
        return this.graphicsService.getPokedexInfo(regionInfo.pokedexes[0].url)
      })
    )
    .subscribe(
      pokedexInfo => {
        // this.regions.map(region => {
        //   if (pokemon.region === region) {
        //     this.pokemonList.push(pokemon.pokemon_list[pokemon.pokemon_list.length - 1])
        //   }
            
        // })

        console.log(pokedexInfo);

        const pokemon: RegionPokemon = {region: '', pokemon_list: ['']}
        const pokemonList = pokedexInfo.pokemon_entries;
        pokemon.pokemon_list.splice(1,1);
        pokemonList.map(pokemonInfo => {
          pokemon.region = pokedexInfo.name
          pokemon.pokemon_list.push(pokemonInfo.pokemon_species.name)
        })
        pokemon.pokemon_list.sort(this.sortArray);

        console.log(pokemon);
      
        switch (pokemon.region) {
          case 'kanto':
            this.kantoPokemonList = pokemon.pokemon_list
            break;
          case 'johto':
            this.johtoPokemonList = pokemon.pokemon_list
            break;
          case 'hoenn':
            this.hoennPokemonList = pokemon.pokemon_list
            break;
          case 'sinnoh':
            this.sinnohPokemonList = pokemon.pokemon_list
            break;
          case 'unova':
            this.unovaPokemonList = pokemon.pokemon_list
            break;
          case 'kalos':
            this.kalosPokemonList = pokemon.pokemon_list
            break;
          case 'alola':
            this.alolaPokemonList = pokemon.pokemon_list
            break;
          case 'galar':
            this.galarPokemonList = pokemon.pokemon_list
            break;
          default:
            break;
        }

        if (pokemon.region === 'kanto') {
          pokemon.pokemon_list.map(pokemon => {
            this.kantoPokemonList.push(pokemon)
          })
        }
        if (pokemon.region === 'original-johto') {
          pokemon.pokemon_list.map(pokemon => {
            this.johtoPokemonList.push(pokemon)
          })
        }
        if (pokemon.region === 'hoenn') {
          pokemon.pokemon_list.map(pokemonName => {
            this.hoennPokemonList.push(pokemonName)
          })
        }
        if (pokemon.region === 'original-sinnoh') {
          pokemon.pokemon_list.map(pokemonName => {
            this.sinnohPokemonList.push(pokemonName)
          })
        }
        if (pokemon.region === 'original-unova') {
          pokemon.pokemon_list.map(pokemonName => {
            this.unovaPokemonList.push(pokemonName)
          })
        }
        if (pokemon.region === 'kalos-central') {
          pokemon.pokemon_list.map(pokemonName => {
            this.kalosPokemonList.push(pokemonName)
          })
        }
        if (pokemon.region === 'original-alola') {
          pokemon.pokemon_list.map(pokemonName => {
            this.alolaPokemonList.push(pokemonName)
          })
        }
        if (pokemon.region === 'galar') {
          pokemon.pokemon_list.map(pokemonName => {
            this.galarPokemonList.push(pokemonName)
          })
        }
        
        this.setValues()

        // console.log('pokedex kanto', this.kantoPokemonList);
        // console.log('pokedex johto', this.johtoPokemonList);
        // console.log('pokedex hoenn', this.hoennPokemonList);
        // console.log('pokedex sinnoh', this.sinnohPokemonList);
        // console.log('pokedex unova', this.unovaPokemonList);
        // console.log('pokedex kalos', this.kalosPokemonList);
        // console.log('pokedex alola', this.alolaPokemonList);
        // console.log('pokedex galar', this.galarPokemonList);


      }
    )
    
    // console.log(this.regions);
    // console.log(this.regionsInfoUrls);

    

  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogChartPokemonComponent, {
      data: {region: this.regions[0]},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  

  
  setValues(): void {
    // Only Change 3 values
    this.barChartData.labels = this.regions
    this.barChartData.datasets[0].data = [
      this.kantoPokemonList.length, 
      this.johtoPokemonList.length, 
      this.hoennPokemonList.length,
      this.sinnohPokemonList.length,
      this.unovaPokemonList.length,
      this.kalosPokemonList.length,
      this.alolaPokemonList.length,
      this.galarPokemonList.length
    ];

    this.barChartData.datasets[1].data = [
      this.kantoLocationsList.length, 
      this.johtoLocationsList.length, 
      this.hoennLocationsList.length,
      this.sinnohLocationsList.length,
      this.unovaLocationsList.length,
      this.kalosLocationsList.length,
      this.alolaLocationsList.length,
      this.galarLocationsList.length
    ];    
    
    this.chart?.update();
  }

  sortArray(x: string, y: string){
    if (x < y) {return -1;}
    if (x > y) {return 1;}
    return 0;
  }


}
