import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Order } from '../../core/models';
import { OrderService } from '../../core/order.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, RouterLink],
  template: `
    <section class="page-heading">
      <p class="eyebrow">Order history</p>
      <h1>Your orders</h1>
      @if (confirmed()) { <p class="success">Order #{{ confirmed() }} confirmed.</p> }
    </section>
    @if (orders().length) {
      <section class="orders">
        @for (order of orders(); track order.id) {
          <article class="order-card">
            <header>
              <div>
                <p class="eyebrow">#{{ order.id }} / {{ order.status }}</p>
                <h2>{{ order.createdAt | date:'medium' }}</h2>
              </div>
              <strong>{{ order.total | currency }}</strong>
            </header>
            <p>Payment reference: {{ order.paymentReference }}</p>
            @for (item of order.items; track item.productId) {
              <div class="mini-item">
                <img [src]="item.imageUrl" [alt]="item.productName">
                <span>{{ item.quantity }} x {{ item.brand }} {{ item.productName }}</span>
              </div>
            }
          </article>
        }
      </section>
    } @else {
      <section class="empty-state">
        <h2>No orders yet</h2>
        <a routerLink="/" class="button">Start shopping</a>
      </section>
    }
  `
})
export class OrdersComponent implements OnInit {
  orders = signal<Order[]>([]);
  confirmed = signal<string | null>(null);

  constructor(private orderService: OrderService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.confirmed.set(this.route.snapshot.queryParamMap.get('confirmed'));
    this.orderService.history().subscribe((orders) => this.orders.set(orders));
  }
}
