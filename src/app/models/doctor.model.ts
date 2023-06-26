import { Hospital } from './hospital.model';

interface _DoctorUser {
  _id: string;
  name: string;
  img: string
}

export class Doctor {
  constructor(
    name: string,
    _id?: string,
    img?: string,
    user?: _DoctorUser,
    hospital?: Hospital
  ){}
}
