import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

import { AllNamesCountry, ShortCountry } from '../interfaces/countries.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private _baseUrl: string = 'https://restcountries.com/v3.1';
  private _regions: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  // private _countriesSubject$: Subject<ShortCountry> = new Subject();
  // public countriesObservable$ = this._countriesSubject$.asObservable();

  get regions(): string[] {
    return [...this._regions];
  }

  constructor(private http: HttpClient) { }

  getCountriesByRegion(region: string): Observable<AllNamesCountry[]> | Observable<[]>  { // Observable<ShortCountry[]> | []

    if (!region) {
      return of([]);
    }
    
    const url: string = `${this._baseUrl}/region/${region}?fields=cca3,name`;
    return this.http.get<AllNamesCountry[]>(url);

  }

  
}