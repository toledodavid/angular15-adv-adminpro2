import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

import { environment } from '../../environments/environment';
import { LoadDoctors } from '../interfaces/load-doctors.interface';
import { Doctor } from '../models/doctor.model';



const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  constructor(private http: HttpClient) {}


  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  loadDoctors() {
    const url = `${base_url}/doctors`;
    return this.http.get<LoadDoctors>(url, this.headers).pipe(
      map((response: LoadDoctors) => response.doctors)
    );
  }

  getDoctorById(id: string) {
    const url = `${base_url}/doctors/${id}`;
    return this.http.get<{ok: boolean, doctor: Doctor}>(url, this.headers).pipe(
      map((response: {ok: boolean, doctor: Doctor}) => response.doctor)
    );
  }

  createDoctor(doctor: {name: string, hospital: string}) {
    const url = `${base_url}/doctors`;
    return this.http.post(url, doctor, this.headers);
  }

  updateDoctor(doctor: Doctor) {
    const url = `${base_url}/doctors/${doctor._id}`;
    return this.http.put(url, doctor, this.headers);
  }

  deleteDoctor(_id: string | undefined) {
    const url = `${base_url}/doctors/${_id}`;
    return this.http.delete(url, this.headers);
  }
}
