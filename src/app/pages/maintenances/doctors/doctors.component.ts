import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay } from 'rxjs';

import { DoctorService } from '../../../services/doctor.service';
import { ModalImageService } from '../../../services/modal-image.service';
import { SearchesService } from '../../../services/searches.service';
import { Doctor } from '../../../models/doctor.model';



@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: []
})
export class DoctorsComponent implements OnInit, OnDestroy {

  doctors: Doctor[] = [];
  doctorsTemp: Doctor[] = [];
  loading: boolean = true;
  imgSubscription!: Subscription;

  constructor(private doctorService: DoctorService, private modalImageService: ModalImageService, private searchesService: SearchesService) {}

  ngOnInit(): void {
    this.loadDoctors();
    this.imgSubscription = this.modalImageService.newImage.pipe(delay(100)).subscribe(img => this.loadDoctors());
  }

  ngOnDestroy(): void {
    this.imgSubscription.unsubscribe();
  }

  loadDoctors() {
    this.loading = true;
    this.doctorService.loadDoctors().subscribe({
      next: (doctors) => {
        this.loading = false;
        this.doctors = doctors;
        this.doctorsTemp = doctors;
      },
      error: (err) => console.warn(err)
    })
  }

  openModalImage(doctor: Doctor) {
    this.modalImageService.openModal('doctors', doctor._id, doctor.img);
  }

  search(target: string): any {
    if (!target) {
      return this.doctors = this.doctorsTemp;
    }

    this.searchesService.search('doctors', target).subscribe((response: Doctor[]) => {
      this.doctors = response;
    });
  }
}
