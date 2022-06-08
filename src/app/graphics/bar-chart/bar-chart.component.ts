import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Subject, Observable, switchMap, tap } from 'rxjs';


import { GraphicsService } from '../services/graphics.service';
import { ShortCountry } from '../interfaces/countries.interfaces';
import { CountriesService } from '../services/countries.service';
import { Dates, DateInfo, Total, CountryData } from '../interfaces/covid-data.interfaces';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styles: [
  ]
})
export class BarChartComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;


  private _infoSubject$: Subject<Total[]> = new Subject();
  public infoObservable$ = this._infoSubject$.asObservable();

  setInfoSubject$ (info: Total[]) {
    this._infoSubject$.next(info);
  }

  public countries: ShortCountry[] = [];

  public countriesInfo: [] = [];

  public labels: string[] = [];

  public data: number[] = [];



  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };
  public barChartType: ChartType = 'bar';
  

  public barChartData: ChartData<'bar'> = {
    labels: this.labels,
    datasets: [
      { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Casos confirmados últimas 24h', backgroundColor: '#FAC287', hoverBackgroundColor: '#50B1E6', borderWidth: 1, borderColor: '#E04A81' }
    ]
  };

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  constructor(private graphicsService: GraphicsService, private countriesService: CountriesService) { }

  ngOnInit(): void {
    // this.graphicsService.getInfoByCountry('canada', '2022-06-01');

    // this.countriesService.getCountriesByRegion('Europe');

    this.countriesService.getCountriesByRegion('Europe').subscribe(
        list => {
          list.map(country => {
            const shortCountry: ShortCountry = {name: '', code: ''};
            shortCountry.name = country.name.common;
            shortCountry.code = country.cca3;
            this.countries.push(shortCountry);
            this.labels.push(shortCountry.name)
          });
          this.countries.sort(this.sortArray)
          this.labels.sort()
            
        }
    )
    

    this.graphicsService.getCountriesInfo(this.labels, '2022-06-01').subscribe(
      infoList => {
        console.log(infoList);
        
        infoList.map(info => {
            this.data.push(info.today_confirmed);
          })
          
      }
    )

    console.log('paises', this.countries);

    console.log('nombres',  this.labels);


    // console.log('confirmed', this.data);

    // this.getConfirmedPerDayByCountry(this.labels).subscribe(
    //   infoList => {
    //     infoList.map(info => {
    //       this.data.push(info.today_confirmed);
    //     })
    //     console.log('confirmed', this.data);
    //   }
    // );

    
    
    
    
    
  }

  getConfirmedPerDayByCountry(region: string): void { //void

    // countries.map(country => {
    //   this.graphicsService.getInfoByCountry(country, '2022-06-01').subscribe(
    //     info => {
    //       console.log('info', info);
          
    //     }
    //   );
    //   // this.data.push(info[0].today_confirmed);
    // })

    // const countries: string[] = [];

    // this.countriesService.getCountriesByRegion(region).subscribe(
    //   list => {
    //     list.map(country => {
    //       const shortCountry: ShortCountry = {name: '', code: ''};
    //       shortCountry.name = country.name.common;
    //       shortCountry.code = country.cca3;
    //       countries.push(shortCountry.name);
    //     });
    //     this.countries.sort(this.sortArray)
          
    //   }
    // )

    // console.log(countries);
    

    this.labels.map(country => {
      this.graphicsService.getInfoByCountry(country, '2022-06-01').subscribe(
        data => {
          const dates: CountryData[] = Object.values(data)
          // console.log(dates[0]);
          
          const dateInfo: DateInfo[] = Object.values(dates[0])
          // console.log(dateInfo[0]);

          const country: DateInfo = dateInfo[0]
          // console.log(country.countries);
          
          const countryInfoList: Total[] = Object.values(country.countries)
          console.log(countryInfoList[0]);

          // const countryInfo = countryInfoList[0]
          
          // const todayConfirmed = countryInfo.today_confirmed;

          const countryInfo = countryInfoList[0].today_confirmed;

          console.log(countryInfo);
          

          // return countryInfo
        }
      )
      // const info: number = this.graphicsService.getInfoByCountry(country, '2022-06-01')
      // this.data.push(info)
    })

    // console.log(this.data);
    
    
    // const totalInfo: Total[] = []
    
    // countries.map(name => {
    //   this.graphicsService.getInfoByCountry(name, '2022-06-01').subscribe(
    //     data => {         

    //       const dates: CountryData[] = Object.values(data)
    //       // console.log(dates[0]);
          
    //       const dateInfo: DateInfo[] = Object.values(dates[0])
    //       // console.log(dateInfo[0]);

    //       const country: DateInfo = dateInfo[0]
    //       // console.log(country.countries);
          
    //       const countryInfoList: Total[] = Object.values(country.countries)
    //       // console.log(countryInfoList[0]);

    //       const countryInfo = countryInfoList[0]
          
    //       // const todayConfirmed = countryInfo.today_confirmed;

    //       totalInfo.push(countryInfo)


          
          
    //     }
    //   )
    // })

    // this.setInfoSubject$(totalInfo)

    // return this.infoObservable$;


  }

  
  randomize(): void {
    // Only Change 3 values
    // this.graphicsService.getInfoByCountry(this.labels[0], '2022-06-01')
    this.barChartData.datasets[0].data = [
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
    ];
    
    this.chart?.update();
  }

  sortArray(x: ShortCountry, y: ShortCountry){
    if (x.name < y.name) {return -1;}
    if (x.name > y.name) {return 1;}
    return 0;
  }

}
