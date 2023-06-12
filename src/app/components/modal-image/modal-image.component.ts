import { Component } from '@angular/core';
import Swal from 'sweetalert2';

import { ModalImageService } from '../../services/modal-image.service';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: [
  ]
})
export class ModalImageComponent {

  imageToUpload!: File;
  imagePreview!: any;

  constructor(public modalImageService: ModalImageService, private fileUploadService: FileUploadService) {}


  openModal() {

  }

  closeModal() {
    this.imagePreview = null;
    this.modalImageService.closeModal();
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

    const id = this.modalImageService.id;
    const type = this.modalImageService.type;

    this.fileUploadService.updateImage(this.imageToUpload, type, id).then(img => {
      Swal.fire('Updated', 'Image updated', 'success');
      this.modalImageService.newImage.emit(img);
      this.closeModal();
    }).catch((err) => {
      console.log(err);
      Swal.fire('Error', 'Issue trying to upload image', 'error');
    });
  }
}
