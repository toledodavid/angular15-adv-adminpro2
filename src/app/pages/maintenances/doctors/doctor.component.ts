import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';

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

  constructor(private formBuilder: FormBuilder,
              private hospitalService: HospitalService,
              private doctorService: DoctorService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id}) => {
      this.loadDoctor(id);
    });

    this.loadHospitals();
    this.doctorForm.get('hospital')?.valueChanges.subscribe({
      next: (hospitalId) => {
        this.hospitalSelected = this.hospitals?.find(hospital => hospital._id === hospitalId);
      }
    });
  }

  loadDoctor(id: string) {
    if (id === 'new') {
      return;
    }
    this.doctorService.getDoctorById(id).pipe(delay(100)).subscribe(doctor => {

      if (!doctor) {
        return this.router.navigateByUrl(`/dashboard/doctors`);
      }
      this.doctorSelected = doctor;
      return this.doctorForm.setValue({name: doctor.name, hospital: doctor.hospital?._id});
    })
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

    if (this.doctorSelected) {
      const data = {
        ...this.doctorForm.value,
        _id: this.doctorSelected._id
      }
      this.doctorService.updateDoctor(data).subscribe(response => {
       Swal.fire('Updated', `Doctor ${name} updated successfuly`, 'success');
      });
    } else {
      this.doctorService.createDoctor(this.doctorForm.value).subscribe((response: any) => {
        console.log(response);
        Swal.fire('Created', `Doctor ${name} created successfuly`, 'success');
        this.router.navigateByUrl(`/dashboard/doctor/${response.doctor._id}`);
      });
    }
  }

}
