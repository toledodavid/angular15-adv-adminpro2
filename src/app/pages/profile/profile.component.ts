import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

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

  imagePreview!: any;

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

        Swal.fire('Saved', 'Information updated', 'success');
      },
      error: ({error}) => {
        Swal.fire('Error', error.message, 'error');
      }
    });
  }

  changeImage(file: File):any {
    this.imageToUpload = file;

    if (!file) {
      return this.imagePreview = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imagePreview = reader.result;
    }
  }

  uploadImage() {
    this.fileUploadService.updateImage(this.imageToUpload, 'users', this.user.uid).then(img => {
      this.user.img = img;
      Swal.fire('Updated', 'Image updated', 'success');
    }).catch((err) => {
      console.log(err);
      Swal.fire('Error', 'Issue trying to upload image', 'error');
    });
  }

}
