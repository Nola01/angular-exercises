import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { delay, switchMap, tap } from 'rxjs';

import { CountriesService } from '../services/countries.service';
import { ShortCountry } from '../interfaces/countries.interfaces';
import { User } from '../interfaces/users.interfaces';
import { CrudService } from '../services/crud.service';
import { ValidatorService } from '../services/validator.service';
import { EmailValidatorService } from '../services/email-validator.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styles: [
  ]
})
export class FormComponent implements OnInit {

  myForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
    confirmPassword: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)]],
    offer: [false, Validators.required],
    region: ['', Validators.required],
    country: ['', Validators.required],
    city: ['', Validators.required]
  },
  {
    validators: [this.validatorService.equalFields('password', 'confirmPassword')]
  });

  get emailErrorMsg(): string {
    const errors = this.myForm.get('email')?.errors;
    if (errors!['require']) {
      return 'El correo es obligatorio'
    } else if (errors!['pattern']) {
      return 'El correo no tiene un formato correcto'
    } else if (errors!['takenEmail']) {
      return 'El correo ya está en uso'
    }

    return '';
  }

  regions: string[] = [];
  countries: ShortCountry[] = [];
  userToEdit !: User;

  editedUser !: User;
  newUser !: User;

  isEdit: boolean = false;
  loading: boolean = false;
  
  constructor(
    private fb: FormBuilder,
    private countriesService: CountriesService,
    private validatorService: ValidatorService,
    private emailValidator: EmailValidatorService
  ) { }

  ngOnInit(): void {

    this.myForm.get('offer')?.setValue(false);

    this.regions = this.countriesService.regions;

    this.myForm.get('region')?.valueChanges.pipe(
      tap(() => {
        this.myForm.get('country')?.reset('');
        this.loading = true;
      }),
      delay(1000),
      switchMap(region => this.countriesService.getCountriesByRegion(region)!)
    ). subscribe(
      countries => {
        this.loading = false;
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

  noValidField(field: string) {
    return this.myForm.get(field)?.invalid && this.myForm.get(field)?.touched;
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
    this.userToEdit = user;
    this.myForm.get('name')?.setValue(user.name);
    this.myForm.get('password')?.setValue(user.password);
    this.myForm.get('email')?.setValue(user.email);
    this.myForm.get('offer')?.setValue(user.offer);
    this.myForm.get('region')?.setValue(user.region);
    this.myForm.get('country')?.setValue(user.country);
    this.myForm.get('city')?.setValue(user.city);
    this.isEdit = true;
  }

  reset() {
    this.myForm.reset();
    this.myForm.get('region')?.setValue("");
    this.myForm.get('country')?.setValue("");
    this.loading = false;
    this.isEdit = false;
  }

  save() {
    if (this.isEdit) {
      this.myForm.get('email')?.addAsyncValidators(this.emailValidator.validate)
    }
    this.newUser = this.getForm();
    this.reset();
  }

  editUser() {
    // console.log(this.myForm.invalid);
    // console.log(this.myForm.errors);
    
    this.editedUser = this.getForm();
    this.editedUser.id = this.userToEdit.id;

    this.myForm.get('email')?.clearValidators();
  
    this.reset();

  }

  sortArray(x: ShortCountry, y: ShortCountry){
    if (x.name < y.name) {return -1;}
    if (x.name > y.name) {return 1;}
    return 0;
  }

}
