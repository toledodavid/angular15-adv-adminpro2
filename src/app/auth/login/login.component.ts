import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2'

import { UserService } from '../../services/user.service';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements AfterViewInit {

  @ViewChild('googleBtn') googleBtn!: ElementRef;

  formSubmitted: boolean = false;

  loginForm: FormGroup = this.formBuilder.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [false]
  });

  constructor(private router: Router, private formBuilder: FormBuilder, private userService: UserService) {}

  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit() {
    google.accounts.id.initialize({
      client_id: '57650590592-v2u0icn5iv0snveeoh1vividcss7p4pr.apps.googleusercontent.com',
      callback: (response:any) => this.handleCredentialResponse(response)
    });
    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse(response: any) {
    // console.log("Encoded JWT ID token: " + response.credential);
    this.userService.loginGoogle(response.credential).subscribe({
      next: (response) => {
        // console.log({login: response});
        this.router.navigateByUrl('/');
      }
    });
  }

  login() {
    this.userService.login(this.loginForm.value).subscribe({
      next: (response) => {
        console.log(response);

        if (this.loginForm.get('remember')?.value) {
          localStorage.setItem('email', this.loginForm.get('email')?.value);
        } else {
          localStorage.removeItem('email');
        }
      },
      error: ({error}) => {
        Swal.fire('Error', error.message, 'error');
      }
    });
    // this.router.navigateByUrl('/');
  }

}
