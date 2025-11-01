import { Component, OnInit } from '@angular/core';
import { UserService, User } from './user.service';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit{

  users : User[] = [];
  

 constructor(private userService: UserService) {}

  ngOnInit(): void {
 this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data;  
   })
  }
}
