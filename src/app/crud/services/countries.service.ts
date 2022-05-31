import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AllNamesCountry } from '../interfaces/countries.interfaces';
import { User } from '../interfaces/users.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private _baseUrl: string = 'https://restcountries.com/v3.1';
  private _regions: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  get regions(): string[] {
    return [...this._regions];
  }

  constructor(private http: HttpClient) { }

  getCountriesByRegion(region: string): Observable<AllNamesCountry[]> | [] {

    if (!region) {
      return [];
    }
    
    const url: string = `${this._baseUrl}/region/${region}?fields=cca3,name`;
    return this.http.get<AllNamesCountry[]>(url);
  }

}
