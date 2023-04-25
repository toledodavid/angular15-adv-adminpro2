import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2'

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent {

  formSubmitted: boolean = false;

  loginForm: FormGroup = this.formBuilder.group({
    email: ['pedro@ucol.mx', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [false]
  });

  constructor(private router: Router, private formBuilder: FormBuilder, private userService: UserService) {}

  login() {
    this.userService.login(this.loginForm.value).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: ({error}) => {
        Swal.fire('Error', error.message, 'error');
      }
    });
    // this.router.navigateByUrl('/');
  }

}
