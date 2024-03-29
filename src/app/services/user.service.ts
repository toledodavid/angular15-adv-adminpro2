import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { LoadUsers } from '../interfaces/load-users.interface';

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

  get role (): 'ADMIN_ROLE' | 'USER_ROLE' {
    return this.user.role || 'USER_ROLE';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  saveLocalStorage(token: string, menu: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
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

        this.saveLocalStorage(response.token, response.menu);
        return true;
      }),
      catchError(error => of(false))
    );
  }

  createUser(formData: RegisterForm) {
    return this.http.post(`${base_url}/users`, formData).pipe(
      tap((response: any) => {
        this.saveLocalStorage(response.token, response.menu);
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
        this.saveLocalStorage(response.token, response.menu);
      })
    );
  }

  loginGoogle(token: string) {
    return this.http.post(`${base_url}/login/google`, {token}).pipe(
      tap((response: any) => {
        this.saveLocalStorage(response.token, response.menu);
      })
    );
  }

  loadUsers(from: number = 0) {
    const url = `${base_url}/users?from=${from}`;
    return this.http.get<LoadUsers>(url, this.headers).pipe(
      map(response => {
        return {
          ...response,
          users: response.users.map(user => new User(user.name, user.email, undefined, user.role, user.google, user.img, user.uid))
        }
      })
    );
  }

  deleteUser(user: User) {
    console.log('Deleting user: ', user);
    const url = `${base_url}/users/${user.uid}`;

    return this.http.delete(url, this.headers);
  }

  saveUser(user: User) {
    return this.http.put(`${base_url}/users/${user.uid}`, user, this.headers);
  }

}
