// src/app/paginas/cart/cart.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { CartService } from '../../services/cart.service';
import { PedidoService } from '../../services/pedido.service';
import { AuthService } from '../../services/auth.service';

import { CartItem, PedidoCreateDTO, PedidoMostrarDTO } from '../../models/pedido.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartComponent implements OnInit {

  items: CartItem[] = [];
  isSubmitting = false;
  submitError: string | null = null;
  submitSuccess: string | null = null;

  constructor(
    private cartService: CartService,
    private pedidoService: PedidoService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cartService.items$.subscribe((items: CartItem[]) => {
      this.items = items;
    });
  }

  get totalPrice(): number {
    return this.items.reduce(
      (acc: number, i: CartItem) => acc + i.price * i.quantity,
      0
    );
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  increase(item: CartItem): void {
    this.cartService.updateQuantity(item.productId, item.quantity + 1);
  }

  decrease(item: CartItem): void {
    this.cartService.updateQuantity(item.productId, item.quantity - 1);
  }

  remove(item: CartItem): void {
    this.cartService.removeItem(item.productId);
  }

  clear(): void {
    this.cartService.clearCart();
  }

  checkout(): void {
    this.submitError = null;
    this.submitSuccess = null;

    if (!this.items.length) {
      this.submitError = 'Tu carrito está vacío.';
      return;
    }

    // 👇 bloqueo fuerte: si no está logueado, no deja ni intentar
    if (!this.isLoggedIn) {
      this.submitError = 'Debes iniciar sesión para confirmar tu pedido.';
      this.router.navigate(['/login']);
      return;
    }

    const dto: PedidoCreateDTO = {
      lineas: this.items.map(i => ({
        productId: i.productId,
        amount: i.quantity
      }))
    };

    this.isSubmitting = true;

    this.pedidoService.create(dto).subscribe({
      next: (pedido: PedidoMostrarDTO) => {
        this.isSubmitting = false;
        this.cartService.clearCart();
        this.submitSuccess = `Pedido #${pedido.id} creado correctamente.`;
      },
      error: (err: any) => {
        console.error('Error al crear pedido', err);
        this.isSubmitting = false;
        this.submitError = 'No se ha podido crear el pedido.';
      }
    });
  }
}
