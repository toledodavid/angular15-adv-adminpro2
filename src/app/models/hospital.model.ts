
interface _HospitalUser {
  _id: string;
  name: string;
  img: string
}

export class Hospital {
  constructor(
    name: string,
    _id?: string,
    img?: string,
    user?: _HospitalUser
  ){}
}
