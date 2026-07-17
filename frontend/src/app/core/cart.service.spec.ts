import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { Product } from './models';

const product: Product = {
  id: 1,
  name: 'Aurum Classic 40',
  brand: 'Aurum',
  category: 'Dress',
  price: 1299,
  movement: 'Automatic',
  caseMaterial: 'Steel',
  strapType: 'Leather',
  imageUrl: '',
  description: 'Demo watch',
  stock: 5
};

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('adds products and computes totals', () => {
    service.add(product, 2);
    expect(service.count()).toBe(2);
    expect(service.total()).toBe(2598);
  });

  it('removes products from the cart', () => {
    service.add(product);
    service.remove(product.id);
    expect(service.items()).toEqual([]);
  });
});
