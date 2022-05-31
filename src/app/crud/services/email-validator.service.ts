import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AsyncValidator, AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { User } from '../interfaces/users.interfaces';

@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService implements AsyncValidator {

  constructor(private http: HttpClient) { }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;
    
    return this.http.get<User[]>(`http://localhost:3000/users?q=${email}`).pipe(
      map(users => {
        if (users.length === 0) {
          return null;
        } else {
          let response: any;
          users.map(user => {
            user.email == email ? response = {takenEmail: true} : response = null;
          })
          return response;
        }
        // return (users.length === 0) ? null : {takenEmail: true}
      })
    );
  }

  
}
