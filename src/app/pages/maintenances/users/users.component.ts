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
  from: number = 0;
  loading: boolean = true;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.userService.loadUsers(this.from).subscribe(({users, total}) => {
      this.totalUsers = total;
      this.users = users;
      this.loading = false;
    });
  }

  changePage(value: number) {
    this.from += value;

    if (this.from < 0) {
      this.from = 0;
    } else if(this.from > this.totalUsers) {
      this.from -= value;
    }

    // console.log(this.from);
    this.loadUsers();
  }
}
