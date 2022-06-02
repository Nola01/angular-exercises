import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { User } from '../interfaces/users.interfaces';
import { CrudService } from '../services/crud.service';
import { EmailValidatorService } from '../services/email-validator.service';

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

  constructor(
    private crudService: CrudService,
    private emailValidatorService: EmailValidatorService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes);
    
    // console.log(changes['newUser']);

    // if (changes['newUser']) {
    //   const newUser: User = changes['newUser'].currentValue;
    //   if (newUser !== changes['newUser'].previousValue) {
    //     this.save(newUser);
    //   }
    // }
     
    // if (changes['editedUser']) {
    //   const editedUser: User = changes['editedUser'].currentValue;

    //   if (editedUser !== changes['editedUser'].previousValue) {
    //     this.editUser(editedUser);
    //   }
    // }
  }

  ngOnInit(): void {
    
    this.crudService.getAllUsers().subscribe(
      users => {
        this.users = users;
      }
    )

    this.updateUser();
  }

  sendSelectedUser(user:User) {
    this.onEditUser.emit(user);
    // this.emailValidatorService.setEditingUserId(user.id!);
  }

  updateUser() {
    this.crudService.userObservable$.subscribe((user: User) => {
      this.newUser = user;
    })
  }

  editUser(user: User) {
    
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
