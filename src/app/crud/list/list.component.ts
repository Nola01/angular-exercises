import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/countries.interfaces';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [
  ]
})
export class ListComponent implements OnInit {

  users: User[] = [];

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.crudService.getAllUsers().subscribe(
      users => {
        this.users = users;
      }
    )
  }

  editUser(user: User) {
    console.log(user);
    
  }

  deleteUser(user: User) {
    console.log(user);
    
  }

}
