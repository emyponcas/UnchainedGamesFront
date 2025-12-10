// src/app/paginas/orders/orders.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { PedidoService } from '../../services/pedido.service';
import { PedidoMostrarDTO } from '../../models/pedido.model';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './orders.html',
  styleUrls: ['./orders.css']
})
export class OrdersComponent implements OnInit {

  orders$!: Observable<PedidoMostrarDTO[]>;

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    // Pedimos todos los pedidos del usuario actual
    this.orders$ = this.pedidoService.getMyOrders();
  }
}
