import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { User } from '../interfaces/users.interfaces';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [
  ]
})
export class ListComponent implements OnInit, OnChanges {

  users: User[] = [];

  @Input() newUser!: User; 

  @Input() editedUser!: User; 

  @Output() onEditUser: EventEmitter<User> = new EventEmitter();

  constructor(private crudService: CrudService) { }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes);
    
    // console.log(changes['newUser']);

    if (changes['newUser']) {
      const newUser: User = changes['newUser'].currentValue;
      if (newUser !== changes['newUser'].previousValue) {
        this.save(newUser);
      }
    }
     
    if (changes['editedUser']) {
      const editedUser: User = changes['editedUser'].currentValue;

      if (editedUser !== changes['editedUser'].previousValue) {
        this.editUser(editedUser);
      }
    }
  }

  ngOnInit(): void {
    
    this.crudService.getAllUsers().subscribe(
      users => {
        this.users = users;
      }
    )
  }

  sendSelectedUser(user:User) {
    this.onEditUser.emit(user);
  }

  save(user: User) {
    this.crudService.createUser(user).subscribe(
      () => {
        this.ngOnInit();
      }
    );

    
  }

  editUser(user: User) {
    this.crudService.editUser(user).subscribe(
      (user) => {
        // console.log('Editado usuario con id', user.id);
        this.ngOnInit();
        
      }
    );
  }

  deleteUser(user: User) {
    this.crudService.deleteUser(user.id!).subscribe(
      () => {
        // console.log('Usuario borrado');
        this.ngOnInit();
      }
    );

    
    
  }

}
