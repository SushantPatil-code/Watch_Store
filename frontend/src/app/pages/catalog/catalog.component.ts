import { Component, OnInit, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../core/product.service';
import { Product } from '../../core/models';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [FormsModule, RouterLink, CurrencyPipe],
  template: `
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">Curated mechanical and modern watches</p>
        <h1>Aurum Watches</h1>
        <p>Discover refined dress pieces, durable divers, and everyday classics selected for presence, craft, and value.</p>
      </div>
    </section>

    <section class="toolbar">
      <input [(ngModel)]="q" (ngModelChange)="load()" placeholder="Search watches, brands, or details">
      <select [(ngModel)]="brand" (ngModelChange)="load()">
        <option value="">All brands</option>
        @for (item of brands(); track item) { <option [value]="item">{{ item }}</option> }
      </select>
      <select [(ngModel)]="category" (ngModelChange)="load()">
        <option value="">All categories</option>
        @for (item of categories(); track item) { <option [value]="item">{{ item }}</option> }
      </select>
      <select [(ngModel)]="sort" (ngModelChange)="load()">
        <option value="name">Name</option>
        <option value="newest">Newest</option>
        <option value="priceAsc">Price low to high</option>
        <option value="priceDesc">Price high to low</option>
      </select>
    </section>

    <section class="product-grid">
      @for (product of products(); track product.id) {
        <a class="product-card" [routerLink]="['/products', product.id]">
          <img [src]="product.imageUrl" [alt]="product.name">
          <div class="card-body">
            <p class="eyebrow">{{ product.brand }} / {{ product.category }}</p>
            <h2>{{ product.name }}</h2>
            <p>{{ product.description }}</p>
            <strong>{{ product.price | currency }}</strong>
          </div>
        </a>
      }
    </section>
  `
})
export class CatalogComponent implements OnInit {
  products = signal<Product[]>([]);
  allProducts = signal<Product[]>([]);
  brands = computed(() => [...new Set(this.allProducts().map((p) => p.brand))]);
  categories = computed(() => [...new Set(this.allProducts().map((p) => p.category))]);
  q = '';
  brand = '';
  category = '';
  sort = 'name';

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.list().subscribe((products) => {
      this.allProducts.set(products);
      this.products.set(products);
    });
  }

  load() {
    this.productService.list({ q: this.q, brand: this.brand, category: this.category, sort: this.sort })
      .subscribe((products) => this.products.set(products));
  }
}
