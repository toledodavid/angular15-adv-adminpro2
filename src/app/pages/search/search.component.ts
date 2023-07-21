import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchesService } from '../../services/searches.service';
import { User } from '../../models/user.model';
import { Doctor } from '../../models/doctor.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {

  users: User[] = [];
  doctors: Doctor[] = [];
  hospitals: Hospital[] = [];


  constructor(private activatedRoute: ActivatedRoute, private searchesService: SearchesService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({term}) => this.globalSearch(term));
  }

  globalSearch(term: string) {
    this.searchesService.globalSearch(term).subscribe((response: any) => {
      this.users = response.users;
      this.doctors = response.doctors;
      this.hospitals = response.hospitals;
      // console.log(response);
    });
  }
}
