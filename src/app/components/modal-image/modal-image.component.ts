import { Component } from '@angular/core';
import { ModalImageService } from '../../services/modal-image.service';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: [
  ]
})
export class ModalImageComponent {

  constructor(public modalImageService: ModalImageService) {}


  openModal() {

  }

  closeModal() {
    this.modalImageService.closeModal();
  }
}
