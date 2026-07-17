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
      </nav>
    </header>
    <main>
      <router-outlet />
    </main>
  `
})
export class AppComponent {
  constructor(public auth: AuthService, public cart: CartService) {}
}
