import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
import { User } from '../models/user.model';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SearchesService {

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

  search(collectionName: 'users' | 'doctors' | 'hospitals', target: string) {
    const url = `${base_url}/all/collection/${collectionName}/${target}`;
    return this.http.get<any[]>(url, this.headers).pipe(
      map((response: any) => {
        switch (collectionName) {
          case 'users':
            return this.transformUsers(response.result);
          default:
            return [];
        }
      })
    );
  }


  private transformUsers(result: any[]): User[] {
    return result.map(user => new User(user.name, user.email, undefined, user.role, user.google, user.img, user.uid));
  }

}
