import { Component } from '@angular/core';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: [
  ]
})
export class ModalImageComponent {

  hideModal: boolean = false;


  closeModal() {
    this.hideModal = true;
  }
}
