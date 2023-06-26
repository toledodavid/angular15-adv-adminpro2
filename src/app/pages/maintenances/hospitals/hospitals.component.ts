import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription, delay } from "rxjs";
import Swal from "sweetalert2";
import { HospitalService } from "../../../services/hospital.service";
import { ModalImageService } from "../../../services/modal-image.service";
import { SearchesService } from "../../../services/searches.service";

import { Hospital } from "../../../models/hospital.model";



@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: []
})
export class HospitalsComponent implements OnInit, OnDestroy {

  hospitals: Hospital[] = [];
  hospitalsTemp: Hospital[] = [];
  loading: boolean = true;
  imgSubscription!: Subscription;

  constructor(private hospitalService: HospitalService, private modalImageService: ModalImageService, private searchesService: SearchesService) {}

  ngOnInit(): void {
    this.loadHospitals();
    this.imgSubscription = this.modalImageService.newImage.pipe(delay(100)).subscribe(img => this.loadHospitals());
  }

  ngOnDestroy(): void {
    this.imgSubscription.unsubscribe();
  }

  loadHospitals() {
    this.loading = true;

    this.hospitalService.loadHospitals().subscribe({
      next: (hospitals) => {
        this.loading = false;
        this.hospitals = hospitals;
        this.hospitalsTemp = hospitals;
      },
      error: (error) => console.warn(error)
    });
  }

  saveChanges(hospital: Hospital) {
    this.hospitalService.updateHospital(hospital._id, hospital.name).subscribe(response => {
      console.log(response);
      Swal.fire('Saved', hospital.name, 'success');
    });
  }

  deleteHospital(hospital: Hospital) {
    this.hospitalService.deleteHospital(hospital._id).subscribe(response => {
      console.log(response);
      this.loadHospitals();
      Swal.fire('Deleted', hospital.name, 'success');
    });
  }

  async openCreateHospitalSwalModal() {
    const { value } = await Swal.fire({
      input: 'text',
      title: 'Create hospital',
      inputPlaceholder: 'Enter the hospital name',
      showCancelButton: true,
    })

    if (value?.trim().length > 0) {
      this.hospitalService.createHospital(value).subscribe((response: any) => {
        this.hospitals.push(response.hospital);
      });
    }
  }

  openModalImage(hospital: Hospital) {
    this.modalImageService.openModal('hospitals', hospital._id, hospital.img);
  }

  search(target: string): any {
    if (!target) {
      return this.hospitals = this.hospitalsTemp;
    }

    this.searchesService.search('hospitals', target).subscribe((response: Hospital[]) => {
      this.hospitals = response;
    });
  }
}
