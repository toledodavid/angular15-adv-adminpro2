import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  profileForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      name: ['David', Validators.required],
      email: ['dtz@gmail.com', [Validators.required, Validators.email]]
    });
  }

  updateProfile() {
    this.userService.updateProfile(this.profileForm.value).subscribe({
      next: console.log,
      error: console.warn
    });
  }

}
