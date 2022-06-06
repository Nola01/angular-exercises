import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { User } from '../interfaces/users.interfaces';
import { Observable, Observer, Subject, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private _baseUrl: string = 'http://localhost:3000'; 
  
  private _user!: User;

  private _userSubject$: Subject<User> = new Subject();
  public userObservable$ = this._userSubject$.asObservable();


  getUser () {
    return {...this._user};
  }

  setUser (user: User) {
    this._user = user;
  }

  setUserSubject$ (user: User) {
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
}
