// src/app/services/pedido.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  PedidoCreateDTO,
  PedidoMostrarDTO
} from '../models/pedido.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private apiUrl = 'http://localhost:8080/pedido';

  constructor(private http: HttpClient) {}

  create(pedido: PedidoCreateDTO): Observable<PedidoMostrarDTO> {
    return this.http.post<PedidoMostrarDTO>(`${this.apiUrl}/create`, pedido);
  }

  getMyOrders(): Observable<PedidoMostrarDTO[]> {
    return this.http.get<PedidoMostrarDTO[]>(`${this.apiUrl}/me`);
  }

  getById(id: number): Observable<PedidoMostrarDTO> {
    return this.http.get<PedidoMostrarDTO>(`${this.apiUrl}/${id}`);
  }
}
