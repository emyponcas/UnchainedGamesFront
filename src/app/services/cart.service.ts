// src/app/services/cart.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/pedido.model';
import { Product } from '../models/product.model';

const CART_KEY = 'cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private itemsSubject = new BehaviorSubject<CartItem[]>(this.loadInitialCart());
  items$ = this.itemsSubject.asObservable();

  private loadInitialCart(): CartItem[] {
    try {
      const raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  private saveCart(items: CartItem[]): void {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    this.itemsSubject.next(items);
  }

  getItemsSnapshot(): CartItem[] {
    return this.itemsSubject.value;
  }

  clearCart(): void {
    this.saveCart([]);
  }

  addProduct(product: Product, quantity: number = 1): void {
    const items = [...this.itemsSubject.value];
    const idx = items.findIndex(i => i.productId === product.id);

    if (idx >= 0) {
      items[idx] = {
        ...items[idx],
        quantity: items[idx].quantity + quantity
      };
    } else {
      items.push({
        productId: product.id!,
        name: product.name,
        picture: product.picture,
        price: product.price,
        quantity
      });
    }

    this.saveCart(items);
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(productId);
      return;
    }

    const items = this.itemsSubject.value.map(item =>
      item.productId === productId ? { ...item, quantity } : item
    );

    this.saveCart(items);
  }

  removeItem(productId: number): void {
    const items = this.itemsSubject.value.filter(i => i.productId !== productId);
    this.saveCart(items);
  }

  getTotalItems(): number {
    return this.itemsSubject.value.reduce((acc, item) => acc + item.quantity, 0);
  }

  getTotalPrice(): number {
    return this.itemsSubject.value.reduce((acc, item) => acc + item.quantity * item.price, 0);
  }
}
