import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../../services/doctor.service';
import { ModalImageService } from '../../../services/modal-image.service';
import { Doctor } from '../../../models/doctor.model';


@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: []
})
export class DoctorsComponent implements OnInit {

  doctors: Doctor[] = [];
  loading: boolean = true;

  constructor(private doctorService: DoctorService, private modalImageService: ModalImageService) {}

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors() {
    this.loading = true;
    this.doctorService.loadDoctors().subscribe({
      next: (doctors) => {
        this.loading = false;
        this.doctors = doctors;
        console.log(this.doctors);
      },
      error: (err) => console.warn(err)
    })
  }

  openModalImage(doctor: Doctor) {
    this.modalImageService.openModal('doctors', doctor._id, doctor.img);
  }
}
