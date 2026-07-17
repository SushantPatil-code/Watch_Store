import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './core/auth.service';
import { CartService } from './core/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  template: `
    <header class="topbar">
      <a routerLink="/" class="brand">
        <span class="brand-mark">A</span>
        <span>Aurum Watches</span>
      </a>
      <nav>
        <a routerLink="/">Catalog</a>
        <a routerLink="/cart">Cart <span class="pill">{{ cart.count() }}</span></a>
        @if (auth.user()) {
          <a routerLink="/orders">Orders</a>
          <button class="link-button" (click)="auth.logout()">Logout</button>
        } @else {
          <a routerLink="/auth">Login</a>
        }
        <button class="theme-toggle" type="button" (click)="toggleTheme()" [attr.aria-pressed]="theme === 'dark'">
          <span class="theme-icon" aria-hidden="true"></span>
          <span>{{ theme === 'dark' ? 'Light' : 'Dark' }}</span>
        </button>
      </nav>
    </header>
    <main>
      <router-outlet />
    </main>
  `
})
export class AppComponent {
  theme: 'light' | 'dark' = 'light';

  constructor(public auth: AuthService, public cart: CartService) {
    const savedTheme = localStorage.getItem('watch_store_theme');
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    this.theme = savedTheme === 'dark' || (!savedTheme && prefersDark) ? 'dark' : 'light';
    this.applyTheme();
  }

  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('watch_store_theme', this.theme);
    this.applyTheme();
  }

  private applyTheme() {
    document.documentElement.dataset['theme'] = this.theme;
  }
}
