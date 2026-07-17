import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './models';

export interface ProductFilters {
  q?: string;
  brand?: string;
  category?: string;
  sort?: string;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private http: HttpClient) {}

  list(filters: ProductFilters = {}) {
    let params = new HttpParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params = params.set(key, value);
    });
    return this.http.get<Product[]>('/api/products', { params });
  }

  detail(id: number) {
    return this.http.get<Product>(`/api/products/${id}`);
  }
}
