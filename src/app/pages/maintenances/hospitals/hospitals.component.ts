import { Component, OnInit } from "@angular/core";
import { HospitalService } from "../../../services/hospital.service";
import { Hospital } from "../../../models/hospital.model";


@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: []
})
export class HospitalsComponent implements OnInit {

  hospitals: Hospital[] = [];
  loading: boolean = true;

  constructor(private hospitalService: HospitalService) {}

  ngOnInit(): void {
    this.loadHospitals();
  }

  loadHospitals() {
    this.loading = true;

    this.hospitalService.loadHospitals().subscribe({
      next: (hospitals) => {
        this.loading = false;
        this.hospitals = hospitals;
      },
      error: (error) => console.warn(error)
    });
  }
}
