import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs';

import { CountriesService } from '../services/countries.service';
import { ShortCountry, User } from '../interfaces/countries.interfaces';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styles: [
  ]
})
export class FormComponent implements OnInit {

  myForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    email: ['', Validators.required],
    offer: [false, Validators.required],
    region: ['', Validators.required],
    country: ['', Validators.required],
    city: ['', Validators.required]
  })

  regions: string[] = [];
  countries: ShortCountry[] = [];
  
  userToEdit !: User;


  constructor(
    private fb: FormBuilder,
    private countriesService: CountriesService,
    private crudService: CrudService
  ) { }

  ngOnInit(): void {

    // this.myForm.reset({
    //   name: 'Usuario 1',
    //   email: 'usuario1@email.com',
    //   username: 'usuario001',
    //   password: '123456',
    //   confirmPassword: '123456',
    //   offer: false,
    // })

    this.regions = this.countriesService.regions;

    this.myForm.get('region')?.valueChanges.pipe(
      tap(() => {
        this.myForm.get('country')?.reset('');
      }),
      switchMap(region => this.countriesService.getCountriesByRegion(region)!)
    ). subscribe(
      countries => {
        this.countries = [];

        // each country has more than one name, but we just need the common one
        countries.map(country => {
          const newCountry = {
            name: '',
            code: ''
          };
          newCountry.name = country.name.common;
          newCountry.code = country.cca3;
          this.countries.push(newCountry)
        })

        // sort by name
        this.countries.sort(this.sortArray);
      }
    );

  }

  

  getForm(): User {
    const name = this.myForm.get('name')?.value;
    const password = this.myForm.get('password')?.value;
    const email = this.myForm.get('email')?.value;
    const offer = this.myForm.get('offer')?.value;
    const region = this.myForm.get('region')?.value;
    const country = this.myForm.get('country')?.value;
    const city = this.myForm.get('city')?.value;
    return {name, password, email, offer, region, country, city};
  }

  setForm(user: User) {
    this.myForm.get('name')?.setValue(user.name);
    this.myForm.get('password')?.setValue(user.password);
    this.myForm.get('email')?.setValue(user.email);
    this.myForm.get('offer')?.setValue(user.offer);
    this.myForm.get('region')?.setValue(user.region);
    this.myForm.get('country')?.setValue(user.country);
    this.myForm.get('city')?.setValue(user.city);
  }

  save() {
    // delete this.myForm.value.confirmPassword;
    // console.log(this.myForm.value);

    const newUser: User = this.getForm();

    this.crudService.createUser(newUser).subscribe(
      user => {
        console.log(user);
      }
    );

    this.myForm.reset();
    // this.crudService.setuser(this._user);
  }

  sortArray(x: ShortCountry, y: ShortCountry){
    if (x.name < y.name) {return -1;}
    if (x.name > y.name) {return 1;}
    return 0;
  }

}
