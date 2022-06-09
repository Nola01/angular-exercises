import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { RegionData, RegionInfo, PokedexInfo, Result, RegionPokemon } from '../interfaces/pokemon.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GraphicsService {

  private _baseUrl: string = 'https://pokeapi.co/api/v2';

  private _regionsInfoSubject$: Subject<RegionInfo> = new Subject();
  public regionInfoObservable$ = this._regionsInfoSubject$.asObservable();

  private _pokedexInfoSubject$: Subject<PokedexInfo> = new Subject();
  public pokedexInfoObservable$ = this._pokedexInfoSubject$.asObservable();

  private _locationsSubject$: Subject<Result[]> = new Subject();
  public locationsObservable$ = this._locationsSubject$.asObservable();

  constructor(private http: HttpClient) { }

  getRegions(): Observable<RegionData> {

    const url = `${this._baseUrl}/region`
    return this.http.get<RegionData>(url);
  }

  getRegionsInfo(regionInfoUrls: string[]): Observable<RegionInfo> {
    
    regionInfoUrls.map(url => {
      this.http.get<RegionInfo>(url).subscribe(
        data => {
          this._regionsInfoSubject$.next(data);
        }
      )
    })

    return this._regionsInfoSubject$
  }

  getLocations(regionInfoUrls: string[]): Observable<Result[]> {

    regionInfoUrls.map(url => {
      this.http.get<RegionInfo>(url).subscribe(
        data => {
          const locationList: Result[] = []
          const locations: Result[] = data.locations;
          locations.map(location => {
            locationList.push(location)
          })
          this._locationsSubject$.next(locationList)
        }
      )
    })

    return this._locationsSubject$

  }

  getPokedexInfo(pokedexUrl: string): Observable<PokedexInfo> {

    this.http.get<PokedexInfo>(pokedexUrl).subscribe(
      data => {
        // const obj = {region: data.name, pokemon_list: ['']}
        // const pokemonList = data.pokemon_entries;
        // obj.pokemon_list.splice(1,1);
        // pokemonList.map(pokemon => {
        //   obj.pokemon_list.push(pokemon.pokemon_species.name)
        // })
        // obj.pokemon_list.sort(this.sortArray);
        this._pokedexInfoSubject$.next(data);
      }
    )

    return this._pokedexInfoSubject$

  }

  sortArray(x: string, y: string){
    if (x < y) {return -1;}
    if (x > y) {return 1;}
    return 0;
  }


}
