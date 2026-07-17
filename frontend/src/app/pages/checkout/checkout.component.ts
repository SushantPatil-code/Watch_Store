import { CurrencyPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../core/cart.service';
import { OrderService } from '../../core/order.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule, CurrencyPipe, RouterLink],
  template: `
    <section class="page-heading">
      <p class="eyebrow">Mock payment</p>
      <h1>Checkout</h1>
    </section>
    @if (cart.items().length) {
      <section class="checkout">
        <form (ngSubmit)="placeOrder()">
          <label>Full name <input [(ngModel)]="shippingName" name="shippingName" required></label>
          <label>Shipping address <textarea [(ngModel)]="shippingAddress" name="shippingAddress" required></textarea></label>
          @if (error()) { <p class="error">{{ error() }}</p> }
          <button>Pay {{ cart.total() | currency }}</button>
        </form>
        <aside class="summary">
          <h2>Payment simulation</h2>
          <p>This creates a paid mock order and reserves stock in the backend.</p>
          <p><span>Total</span><strong>{{ cart.total() | currency }}</strong></p>
        </aside>
      </section>
    } @else {
      <section class="empty-state">
        <h2>Your cart is empty</h2>
        <a routerLink="/" class="button">Browse watches</a>
      </section>
    }
  `
})
export class CheckoutComponent {
  shippingName = '';
  shippingAddress = '';
  error = signal('');

  constructor(private orders: OrderService, public cart: CartService, private router: Router) {}

  placeOrder() {
    const items = this.cart.items().map((item) => ({ productId: item.product.id, quantity: item.quantity }));
    this.orders.checkout(items, this.shippingName, this.shippingAddress).subscribe({
      next: (order) => {
        this.cart.clear();
        this.router.navigate(['/orders'], { queryParams: { confirmed: order.id } });
      },
      error: (err) => this.error.set(err.error?.message || 'Could not place order')
    });
  }
}
