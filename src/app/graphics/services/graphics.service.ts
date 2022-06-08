import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CountryData, DateInfo, Total, Dates } from '../interfaces/covid-data.interfaces';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphicsService {

  private _baseUrl: string = 'https://api.covid19tracking.narrativa.com/api';

  private _infoSubject$: Subject<Total[]> = new Subject();
  public infoObservable$ = this._infoSubject$.asObservable();

  setInfoSubject$ (info: Total[]) {
    this._infoSubject$.next(info);
  }

  date: string = "";

  constructor(private http: HttpClient) { }

  getCountriesInfo(countries: string[], date: string): Observable<Total[]> | Observable<[]> {

    if (!countries || !date) {
      return of([])
    }

    const totalInfo: Total[] = []

    this.setInfoSubject$(totalInfo)

    return this.infoObservable$;
  }

  getInfoByCountry(country: string, date: string): Observable<CountryData[]> | Observable<[]> { //  Observable<CountryData[]> | Observable<[]> // Total[]

    if (!country || !date) {
      return of([])
    }

    const url = `${this._baseUrl}/${date}/country/${country}`;
    return this.http.get<CountryData[]>(url);

    // if (!country || !date) {
    //   return []
    // }

    // const url = `${this._baseUrl}/${date}/country/${country}`;

    // const countryInfo: Total[] = [];

    // let countryInfo!: number;

    // this.http.get<CountryData>(url).subscribe(
    //   data => {

    //     const dates: Dates[] = Object.values(data)
    //     // console.log(dates[0]);
        
    //     const dateInfo: DateInfo[] = Object.values(dates[0])
    //     // console.log(dateInfo[0]);

    //     const country: DateInfo = dateInfo[0]
    //     // console.log(country.countries);
        
    //     const countryInfoList: Total[] = Object.values(country.countries)
    //     console.log(countryInfoList[0]);

    //     // const countryInfo = countryInfoList[0]
        
    //     // const todayConfirmed = countryInfo.today_confirmed;

    //     countryInfo = countryInfoList[0].today_confirmed;

    //     console.log(countryInfo);
        

    //     // return countryInfo
        
    //   }
    // );

    // console.log('countryInfo', countryInfo);

    // return countryInfo

  }
}
