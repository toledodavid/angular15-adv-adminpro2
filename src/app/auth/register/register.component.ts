import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent {

  registerForm = this.formBuilder.group({
    name: ['Pedro', Validators.required],
    email: ['pedro@ucol.mx', [Validators.required, Validators.email]],
    password: ['123456', Validators.required],
    password2: ['123456', Validators.required],
    terms: [false, Validators.required]
  });

  constructor(private formBuilder: FormBuilder){}

  createUser() {
    console.log(this.registerForm.value);
  }

}
