import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  profileForm!: FormGroup;
  user!: User;
  imageToUpload!: File;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private fileUploadService: FileUploadService) {
    this.user =  userService.user;
  }

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]]
    });
  }

  updateProfile() {
    this.userService.updateProfile(this.profileForm.value).subscribe({
      next: (response) => {
        const {name, email} = this.profileForm.value;
        this.user.name = name;
        this.user.email = email;
      },
      error: console.error
    });
  }

  changeImage(file: File) {
    this.imageToUpload = file;
  }

  uploadImage() {
    this.fileUploadService.updateImage(this.imageToUpload, 'users', this.user.uid).then(console.log);
  }

}
