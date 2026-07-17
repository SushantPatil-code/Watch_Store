import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule],
  template: `
    <section class="auth-panel">
      <p class="eyebrow">{{ mode === 'login' ? 'Welcome back' : 'Create account' }}</p>
      <h1>{{ mode === 'login' ? 'Login' : 'Sign up' }}</h1>
      <form (ngSubmit)="submit()">
        @if (mode === 'signup') {
          <label>Name <input [(ngModel)]="name" name="name" required></label>
        }
        <label>Email <input [(ngModel)]="email" name="email" type="email" required></label>
        <label>Password <input [(ngModel)]="password" name="password" type="password" required minlength="6"></label>
        @if (error) { <p class="error">{{ error }}</p> }
        <button>{{ mode === 'login' ? 'Login' : 'Create account' }}</button>
      </form>
      <button class="link-button" (click)="toggle()">
        {{ mode === 'login' ? 'Need an account? Sign up' : 'Already have an account? Login' }}
      </button>
    </section>
  `
})
export class AuthComponent {
  mode: 'login' | 'signup' = 'login';
  name = '';
  email = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) {}

  toggle() {
    this.mode = this.mode === 'login' ? 'signup' : 'login';
    this.error = '';
  }

  submit() {
    const request = this.mode === 'login'
      ? this.auth.login(this.email, this.password)
      : this.auth.signup(this.name, this.email, this.password);
    request.subscribe({
      next: () => this.router.navigateByUrl(this.route.snapshot.queryParamMap.get('returnUrl') || '/'),
      error: (err) => this.error = err.error?.message || 'Could not complete authentication'
    });
  }
}
