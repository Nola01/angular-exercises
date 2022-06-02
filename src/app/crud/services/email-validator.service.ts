import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AsyncValidator, AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable, map, delay } from 'rxjs';
import { User } from '../interfaces/users.interfaces';
import { CrudService } from './crud.service';

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

  // editingUser!: User;
  // response!: any;
  // error: boolean = false;

  // private _editingUserId!: number;

  // setEditingUserId(id: number){
  //   this._editingUserId = id;
  // }

  // constructor(private http: HttpClient, private crudService: CrudService) { }

  // validate = (control: AbstractControl): Observable<ValidationErrors | null> => {
  //   const email = control.value;
  //   // let response: any;

  //   console.log(this._editingUserId);

    
    
  //   return this.http.get<User[]>(`http://localhost:3000/users?q=${email}`).pipe(
  //     map(users => {
  //       console.log(users);

  //       this.crudService.getUserById(this._editingUserId).subscribe(
  //         user => {{
  //           this.editingUser = user;
  //         }}
  //       )
        

  //       if(users.length === 1) {

  //         this.crudService.getUserByEmail(users[0].email!).subscribe(
  //           users => {
  //             const user = users[0];
  //             console.log(user.email);
  //             console.log(email);

  //             console.log(user.id);
  //             console.log(this._editingUserId);

  //             console.log(user.name);
  //             console.log(this.editingUser.name);

  //             console.log(this.editingUser);


  //             // this.response = null;

  //             // if (user.email !== email && user.id !== this.editingUser.id) {
  //             //   this.response = {takenEmail: true}
  //             // }
              
  //             if (user.email === email && user.id === this.editingUser.id) {
  //               this.error = false;
  //               console.log('No error ', this.error);
                
  //             } else {
  //               this.error = true;
  //               console.log('Error ', this.error);
                
                
  //             }

              
  //           }
  //         )
  //       } else if (users.length === 0) {
  //         console.log('No error length 0');
          
  //         this.response = null;
  //       }
  //       console.log(this.response);
        
  //       return (this.error) ? {takenEmail: true} : null;
  //       // return (users.length === 0) ? null : {takenEmail: true}
  //     })
  //   );
  // }

  
}
