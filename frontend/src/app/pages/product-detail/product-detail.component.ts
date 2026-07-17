import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../../core/models';
import { ProductService } from '../../core/product.service';
import { CartService } from '../../core/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  template: `
    @if (product(); as watch) {
      <section class="detail">
        <img [src]="watch.imageUrl" [alt]="watch.name">
        <div>
          <p class="eyebrow">{{ watch.brand }} / {{ watch.category }}</p>
          <h1>{{ watch.name }}</h1>
          <p class="lead">{{ watch.description }}</p>
          <strong class="price">{{ watch.price | currency }}</strong>
          <dl>
            <div><dt>Movement</dt><dd>{{ watch.movement }}</dd></div>
            <div><dt>Case</dt><dd>{{ watch.caseMaterial }}</dd></div>
            <div><dt>Strap</dt><dd>{{ watch.strapType }}</dd></div>
            <div><dt>Stock</dt><dd>{{ watch.stock }}</dd></div>
          </dl>
          <div class="actions">
            <button (click)="cart.add(watch)">Add to cart</button>
            <a routerLink="/cart" class="secondary-button">View cart</a>
          </div>
        </div>
      </section>
    }
  `
})
export class ProductDetailComponent implements OnInit {
  product = signal<Product | null>(null);

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    public cart: CartService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.detail(id).subscribe((product) => this.product.set(product));
  }
}
