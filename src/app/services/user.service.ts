import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment.development';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { User } from '../models/user.model';



declare const google: any;

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user!: User;

  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.user.uid || '';
  }

  logout() {
    localStorage.removeItem('token');
    google.accounts.id.revoke('david_toledo@ucol.mx', () => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }

  validateToken(): Observable<boolean> {
    return this.http.get(`${base_url}/login/renew`, {headers: {'x-token': this.token}}).pipe(
      map((response: any) => {
        const {name, email, img = '', google,role, uid} = response.user;
        this.user = new User(name, email, '', role, google, img, uid);
        localStorage.setItem('token', response.token);
        return true;
      }),
      catchError(error => of(false))
    );
  }

  createUser(formData: RegisterForm) {
    return this.http.post(`${base_url}/users`, formData).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  updateProfile(data: {name: string, email: string, role: string | undefined}) {
    data = {
      ...data,
      role: this.user.role
    }
    return this.http.put(`${base_url}/users/${this.uid}`, data, {headers: {'x-token': this.token}})
  }

  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  loginGoogle(token: string) {
    return this.http.post(`${base_url}/login/google`, {token}).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
      })
    );
  }

}
