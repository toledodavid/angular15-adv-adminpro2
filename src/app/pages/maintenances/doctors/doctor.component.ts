import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { Hospital } from '../../../models/hospital.model';
import { Doctor } from '../../../models/doctor.model';

import { HospitalService } from '../../../services/hospital.service';
import { DoctorService } from '../../../services/doctor.service';


@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: []
})
export class DoctorComponent implements OnInit {

  public doctorForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    hospital: ['', Validators.required]
  });

  hospitals?: Hospital [] = [];

  hospitalSelected?: Hospital;
  doctorSelected?: Doctor;

  constructor(private formBuilder: FormBuilder, private hospitalService: HospitalService, private doctorService: DoctorService, private router: Router) {}

  ngOnInit(): void {
    this.loadHospitals();
    this.doctorForm.get('hospital')?.valueChanges.subscribe({
      next: (hospitalId) => {
        this.hospitalSelected = this.hospitals?.find(hospital => hospital._id === hospitalId);
      }
    });
  }

  loadHospitals() {
    this.hospitalService.loadHospitals().subscribe({
      next: (hospitals: Hospital[]) => {
        this.hospitals = hospitals;
      }
    });
  }

  saveDoctor() {
    const {name} = this.doctorForm.value;
    this.doctorService.createDoctor(this.doctorForm.value).subscribe((response: any) => {
      console.log(response);
      Swal.fire('Created', `Doctor ${name} created successfuly`, 'success');
      this.router.navigateByUrl(`/dashboard/doctor/${response.doctor._id}`);
    });
  }

}
