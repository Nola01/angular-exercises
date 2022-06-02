import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { User } from '../interfaces/users.interfaces';
import { Observable, Observer, Subject, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private _baseUrl: string = 'http://localhost:3000'; 

  isEdit: boolean = false;
  
  isEditSubscriber(observer: Observer<boolean>) {
    observer.next(this.isEdit);
    return {unsubscribe() {}};
  }

  isEditObservable$ = new Observable(this.isEditSubscriber);

  
  
  private _userSubject$: Subject<User> = new Subject();
  public userObservable$ = this._userSubject$.asObservable();

  set userSubject$ (user: User) {
    this._userSubject$.next(user);
  }

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    const url: string = `${this._baseUrl}/users`;
    return this.http.get<User[]>(url);
  }

  getUserById(id: number): Observable<User> {
    const url: string = `${this._baseUrl}/users/${id}`;
    return this.http.get<User>(url);
  }

  getUserByEmail(email: string): Observable<User[]> {
    const url: string = `${this._baseUrl}/users?q=${email}`;
    return this.http.get<User[]>(url);
  }

  createUser(user: User): Observable<User> {
    const url: string = `${this._baseUrl}/users`;
    // console.log(user);
    
    return this.http.post<User>(url, user);
  }

  editUser(user: User): Observable<User> {
    const url: string = `${this._baseUrl}/users/${user.id}`;
    // console.log(user);
    
    
    return this.http.put<User>(url, user);
  }

  deleteUser(id: number): Observable<User> {
    const url: string = `${this._baseUrl}/users/${id}`;
    // console.log(id);
    return this.http.delete<User>(url);
  }

  // validateIsEdit(users: User[], email: string): Observable<boolean> {

  //   this.getUserByEmail(email).subscribe(
  //     user => {
  //       this.editingUser = user
  //     }
  //   )
    
  //   users.map(
  //     user => {
  //       this.getUserById(user.id!).subscribe(
  //         user => {
  //           console.log(user.email);
  //           console.log(email);
            
  //           if (user.email === email) {
  //             this.isEdit = true;
  //           }
  //         }
  //       )
  //     }
  //   )

  //   return this.isEditObservable$;
  // }
}
