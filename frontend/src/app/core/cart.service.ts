import { Injectable, computed, signal } from '@angular/core';
import { CartItem, Product } from './models';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly storageKey = 'watch_store_cart';
  items = signal<CartItem[]>(this.read());
  count = computed(() => this.items().reduce((sum, item) => sum + item.quantity, 0));
  total = computed(() => this.items().reduce((sum, item) => sum + item.product.price * item.quantity, 0));

  add(product: Product, quantity = 1) {
    const existing = this.items().find((item) => item.product.id === product.id);
    const next = existing
      ? this.items().map((item) => item.product.id === product.id
        ? { ...item, quantity: Math.min(product.stock, item.quantity + quantity) }
        : item)
      : [...this.items(), { product, quantity }];
    this.write(next);
  }

  setQuantity(productId: number, quantity: number) {
    const next = this.items()
      .map((item) => item.product.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item)
      .filter((item) => item.quantity > 0);
    this.write(next);
  }

  remove(productId: number) {
    this.write(this.items().filter((item) => item.product.id !== productId));
  }

  clear() {
    this.write([]);
  }

  private write(items: CartItem[]) {
    this.items.set(items);
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  private read() {
    const raw = localStorage.getItem(this.storageKey);
    return raw ? JSON.parse(raw) as CartItem[] : [];
  }
}
