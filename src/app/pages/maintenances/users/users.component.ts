import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit {

  totalUsers: number = 0;
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.loadUsers().subscribe(({users, total}) => {
      this.totalUsers = total;
      this.users = users;
    });
  }
}
