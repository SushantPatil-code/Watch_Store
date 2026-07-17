import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  template: `
    <section class="page-heading">
      <p class="eyebrow">Shopping bag</p>
      <h1>Your cart</h1>
    </section>
    @if (cart.items().length) {
      <section class="cart-layout">
        <div class="line-items">
          @for (item of cart.items(); track item.product.id) {
            <article class="line-item">
              <img [src]="item.product.imageUrl" [alt]="item.product.name">
              <div>
                <h2>{{ item.product.name }}</h2>
                <p>{{ item.product.brand }}</p>
                <strong>{{ item.product.price | currency }}</strong>
              </div>
              <input type="number" min="1" [value]="item.quantity" (change)="cart.setQuantity(item.product.id, $any($event.target).valueAsNumber)">
              <button class="ghost-button" (click)="cart.remove(item.product.id)">Remove</button>
            </article>
          }
        </div>
        <aside class="summary">
          <h2>Order summary</h2>
          <p><span>Items</span><strong>{{ cart.count() }}</strong></p>
          <p><span>Total</span><strong>{{ cart.total() | currency }}</strong></p>
          <a routerLink="/checkout" class="button">Checkout</a>
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
export class CartComponent {
  constructor(public cart: CartService) {}
}
