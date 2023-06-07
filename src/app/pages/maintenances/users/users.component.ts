import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { User } from 'src/app/models/user.model';

import { UserService } from '../../../services/user.service';
import { SearchesService } from '../../../services/searches.service';
import { ModalImageService } from '../../../services/modal-image.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit {

  totalUsers: number = 0;
  users: User[] = [];
  usersTemp: User[] = [];
  from: number = 0;
  loading: boolean = true;

  constructor(private userService: UserService, private searchesService: SearchesService, private modalImageService: ModalImageService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.userService.loadUsers(this.from).subscribe(({users, total}) => {
      this.totalUsers = total;
      this.users = users;
      this.usersTemp = users;
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

  search(target: string): any {
    if (!target) {
      return this.users = this.usersTemp;
    }

    this.searchesService.search('users', target).subscribe(response => {
      this.users = response;
    });
  }

  deleteUser(user: User): any {

    if (user.uid === this.userService.uid) {
      return Swal.fire('Error', 'Cannot delete yourself', 'error');
    }

    Swal.fire({
      title: 'Delete an user?',
      text: `You are going to delete to ${user.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.userService.deleteUser(user).subscribe(() => {
          this.loadUsers();
          Swal.fire(
            'Deleted!',
            `User ${user.name} has been deleted`,
            'success'
          );
        });

      }
    })
  }


  changeRole(user: User) {
    this.userService.saveUser(user).subscribe(response => {
      console.log(response);
    });
  }

  openModalImage(user: User) {
    this.modalImageService.openModal();
  }
}
