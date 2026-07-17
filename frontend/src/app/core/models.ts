export interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  movement: string;
  caseMaterial: string;
  strapType: string;
  imageUrl: string;
  description: string;
  stock: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CheckoutItem {
  productId: number;
  quantity: number;
}

export interface OrderItem {
  productId: number;
  productName: string;
  brand: string;
  imageUrl: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: number;
  total: number;
  status: 'PAID' | 'CANCELLED';
  paymentReference: string;
  shippingName: string;
  shippingAddress: string;
  createdAt: string;
  items: OrderItem[];
}
