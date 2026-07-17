import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthResponse, User } from './models';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenKey = 'watch_store_token';
  user = signal<User | null>(this.readUser());

  constructor(private http: HttpClient, private router: Router) {}

  get token() {
    return localStorage.getItem(this.tokenKey);
  }

  get isLoggedIn() {
    return !!this.token;
  }

  signup(name: string, email: string, password: string) {
    return this.http.post<AuthResponse>('/api/auth/signup', { name, email, password }).pipe(tap((res) => this.save(res)));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponse>('/api/auth/login', { email, password }).pipe(tap((res) => this.save(res)));
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('watch_store_user');
    this.user.set(null);
    this.router.navigateByUrl('/');
  }

  private save(response: AuthResponse) {
    localStorage.setItem(this.tokenKey, response.token);
    localStorage.setItem('watch_store_user', JSON.stringify(response.user));
    this.user.set(response.user);
  }

  private readUser() {
    const raw = localStorage.getItem('watch_store_user');
    return raw ? JSON.parse(raw) as User : null;
  }
}
