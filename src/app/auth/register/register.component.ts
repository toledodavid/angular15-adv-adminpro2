import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent {

  formSubmitted =  false;

  registerForm = this.formBuilder.group({
    name: ['Pedro', Validators.required],
    email: ['pedro@ucol.mx', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    password2: ['', Validators.required],
    terms: [false, Validators.required]
  }, {
    validators: this.equalPasswords('password', 'password2')
  });

  constructor(private formBuilder: FormBuilder, private userService: UserService){}

  createUser() {
    this.formSubmitted = true;

    if (this.registerForm.valid && this.registerForm.get('terms')?.value) {
      this.userService.createUser(this.registerForm.value).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: ({error}) => {
          Swal.fire('Error', error.message, 'error');
        }
      });
    } else {
      return;
    }
  }

  invalidField(field: string): boolean {
    if (this.formSubmitted && this.registerForm.get(field)?.invalid) {
      return true;
    } else {
      return false;
    }
  }

  invalidPasswords(): boolean {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    return (this.formSubmitted && pass1 !== pass2) ? true : false;
  }

  acceptTerms(): boolean {
    return this.formSubmitted && !this.registerForm.get('terms')?.value;
  }

  equalPasswords(pass1Name: string,pass2Name: string) {

    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if (pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null);
      } else {
        pass2Control?.setErrors({noEqual: true});
      }
    }
  }

}
