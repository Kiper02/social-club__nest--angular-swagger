import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRegistration } from '../../interfaces/auth/registration';
import { ILogin } from '../../interfaces/auth/login';
import { IToken } from '../../interfaces/auth/token';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuth: boolean = false;

  public checkAuth() {
    return this.isAuth;
  }

  constructor(private http: HttpClient, private route: Router) {
    if (localStorage.getItem('token')) {
      this.isAuth = true;
    }
  }

  registration(dto: IRegistration) {
    this.http
      .post<IToken>(`${environment.apiUrl}/auth/registration`, dto)
      .subscribe((data: IToken) => {
        localStorage.setItem('token', data.token);
        this.isAuth = true;
        this.route.navigate(['/profile'])
      });
  }

  login(dto: ILogin) {
    this.http
      .post<IToken>(`${environment.apiUrl}/auth/login`, dto)
      .subscribe((data: IToken) => {
        localStorage.setItem('token', data.token)
        this.isAuth = true;
        this.route.navigate(['/profile'])
      });
  }

  logout() {
    localStorage.removeItem('token')
    this.isAuth = false;
    this.route.navigate(['login'])
  }
}
