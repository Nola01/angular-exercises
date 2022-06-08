import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { delay, startWith, switchMap, tap } from 'rxjs';

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
    id: [null],
    name: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
    confirmPassword: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)], [this.emailValidator]],
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
    // console.log(errors!['takenEmail']);
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

  users: User[] = [];
  editedUser !: User;
  newUser !: User;
  formValue !: User;

  isEdit: boolean = false;
  loading: boolean = false;
  
  constructor(
    private fb: FormBuilder,
    private countriesService: CountriesService,
    private crudService: CrudService,
    private validatorService: ValidatorService,
    private emailValidator: EmailValidatorService
  ) { 

  }

  ngOnInit(): void {

    this.crudService.userObservable$.subscribe(
      user => {
        this.setForm(user)
      }
    )

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
    this.myForm.patchValue(user)

    this.emailValidator.originalEmail = user.email;
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
    this.formValue = this.getForm();
    this.crudService.createUser(this.formValue).subscribe(
      (user) => {
        this.newUser = user;
        this.crudService.setUserSubject$(user)
        this.reset();
      }
    );
  }

  editUser() {
    
    this.editedUser = this.getForm();
    this.editedUser.id = this.userToEdit.id;


    this.crudService.editUser(this.editedUser).subscribe(
      (user) => {
        // console.log('Editado usuario con id', user.id);  
        this.crudService.setUserSubject$(user)
        this.reset();
      }
    );

    this.reset();

  }

  sortArray(x: ShortCountry, y: ShortCountry){
    if (x.name < y.name) {return -1;}
    if (x.name > y.name) {return 1;}
    return 0;
  }

}
