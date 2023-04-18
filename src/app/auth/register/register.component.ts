import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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
  });

  constructor(private formBuilder: FormBuilder){}

  createUser() {
    this.formSubmitted = true;

    if (this.registerForm.valid && this.registerForm.get('terms')?.value) {
      console.log('Posting form');
      console.log(this.registerForm.value);
    } else {
      console.log('Invalid form');
    }
  }

  invalidField(field: string): boolean {
    if (this.formSubmitted && this.registerForm.get(field)?.invalid) {
      return true;
    } else {
      return false;
    }
  }

  acceptTerms() {
    return this.formSubmitted && !this.registerForm.get('terms')?.value;
  }

}
