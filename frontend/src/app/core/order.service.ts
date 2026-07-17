import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CheckoutItem, Order } from './models';

@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor(private http: HttpClient) {}

  checkout(items: CheckoutItem[], shippingName: string, shippingAddress: string) {
    return this.http.post<Order>('/api/orders', { items, shippingName, shippingAddress });
  }

  history() {
    return this.http.get<Order[]>('/api/orders');
  }
}
