import { Component, ViewChild, OnInit } from '@angular/core';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { GraphicsService } from '../services/graphics.service';
import { switchMap } from 'rxjs';
import { Result, MainGeneration, RegionPokemon } from '../interfaces/pokemon.interfaces';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html'
})
export class LineChartComponent implements OnInit {

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Pokemons por región',
        backgroundColor: 'rgba(245,160,82,0.3)',
        borderColor: 'rgba(245,148,0,1)',
        pointBackgroundColor: 'rgba(0,0,0,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
      {
        data: [],
        label: 'Localizaciones por región',
        backgroundColor: 'rgba(77,184,227,0.3)',
        borderColor: 'rgba(12,132,230,1)',
        pointBackgroundColor: 'rgba(0,0,0,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
        fill: 'origin',
      }
    ],
    labels: []
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {},
      'y-axis-0':
        {
          position: 'left'
        }
    },

    plugins: {
      legend: { display: true },
      // annotation: {
      //   annotations: [
      //     {
      //       type: 'line',
      //       scaleID: 'x',
      //       value: 'March',
      //       borderColor: 'orange',
      //       borderWidth: 2,
      //       label: {
      //         position: 'center',
      //         enabled: true,
      //         color: 'orange',
      //         content: 'LineAnno',
      //         font: {
      //           weight: 'bold'
      //         }
      //       }
      //     },
      //   ],
      // }
    }
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

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

  constructor (private graphicsService: GraphicsService) {}

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

        const pokemon: RegionPokemon = {region: '', pokemon_list: ['']}
        const pokemonList = pokedexInfo.pokemon_entries;
        pokemon.pokemon_list.splice(1,1);
        pokemonList.map(pokemonInfo => {
          pokemon.region = pokedexInfo.name
          pokemon.pokemon_list.push(pokemonInfo.pokemon_species.name)
        })
        pokemon.pokemon_list.sort(this.sortArray);

        // console.log(pokemon);
      
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

        if (pokemon.region === 'kanto' && this.kantoPokemonList.length === 0) {
          pokemon.pokemon_list.map(pokemon => {
            this.kantoPokemonList.push(pokemon)
          })
        }
        if (pokemon.region === 'original-johto' && this.johtoPokemonList.length === 0) {
          pokemon.pokemon_list.map(pokemon => {
            this.johtoPokemonList.push(pokemon)
          })
        }
        if (pokemon.region === 'hoenn' && this.hoennPokemonList.length === 0) {
          pokemon.pokemon_list.map(pokemonName => {
            this.hoennPokemonList.push(pokemonName)
          })
        }
        if (pokemon.region === 'original-sinnoh' && this.sinnohPokemonList.length === 0) {
          pokemon.pokemon_list.map(pokemonName => {
            this.sinnohPokemonList.push(pokemonName)
          })
        }
        if (pokemon.region === 'original-unova' && this.unovaPokemonList.length === 0) {
          pokemon.pokemon_list.map(pokemonName => {
            this.unovaPokemonList.push(pokemonName)
          })
        }
        if (pokemon.region === 'kalos-central' && this.kalosPokemonList.length === 0) {
          pokemon.pokemon_list.map(pokemonName => {
            this.kalosPokemonList.push(pokemonName)
          })
        }
        if (pokemon.region === 'original-alola' && this.alolaPokemonList.length === 0) {
          pokemon.pokemon_list.map(pokemonName => {
            this.alolaPokemonList.push(pokemonName)
          })
        }
        if (pokemon.region === 'galar' && this.galarPokemonList.length === 0) {
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
  }

  private static generateNumber(i: number): number {
    return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
  }

  public randomize(): void {
    for (let i = 0; i < this.lineChartData.datasets.length; i++) {
      for (let j = 0; j < this.lineChartData.datasets[i].data.length; j++) {
        this.lineChartData.datasets[i].data[j] = LineChartComponent.generateNumber(i);
      }
    }
    this.chart?.update();
  }

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  setValues(): void {
    // Only Change 3 values
    this.lineChartData.labels = this.regions

    this.lineChartData.datasets[0].data = [
      this.kantoPokemonList.length, 
      this.johtoPokemonList.length, 
      this.hoennPokemonList.length,
      this.sinnohPokemonList.length,
      this.unovaPokemonList.length,
      this.kalosPokemonList.length,
      this.alolaPokemonList.length,
      this.galarPokemonList.length
    ];

    this.lineChartData.datasets[1].data = [
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
