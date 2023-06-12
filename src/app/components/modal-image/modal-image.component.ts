import { Component } from '@angular/core';
import { ModalImageService } from '../../services/modal-image.service';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: [
  ]
})
export class ModalImageComponent {

  imageToUpload!: File;
  imagePreview!: any;

  constructor(public modalImageService: ModalImageService) {}


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
}
