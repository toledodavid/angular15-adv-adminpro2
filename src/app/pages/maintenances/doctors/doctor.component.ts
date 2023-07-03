import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from 'src/app/models/hospital.model';


@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: []
})
export class DoctorComponent implements OnInit {

  public doctorForm: FormGroup = this.formBuilder.group({
    name: ['Javier', Validators.required],
    hospital: ['', Validators.required]
  });

  hospitals?: Hospital [] = [];

  hospitalSelected?: Hospital;

  constructor(private formBuilder: FormBuilder, private hospitalService: HospitalService) {}

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
    console.log(this.doctorForm.value);
  }

}
