// src/app/models/pedido.model.ts

// Lo que manda el front para crear un pedido
export interface PedidoLineCreateDTO {
  productId: number;
  amount: number;
}

export interface PedidoCreateDTO {
  lineas: PedidoLineCreateDTO[];
}

// Lo que devuelve el back al mostrar un pedido
export interface PedidoLineMostrarDTO {
  id: number;
  productId: number;
  productName: string;
  productPicture?: string | null;

  amount: number;
  unitPrice: number;
  lineTotal: number;
}

export interface PedidoMostrarDTO {
  id: number;
  datetime: string;   // llega como string (Timestamp)
  status: number;
  total: number;

  usuarioId: number;
  usuarioName: string;

  lineas: PedidoLineMostrarDTO[];
}

// Modelo del carrito en el front (no es DTO del back)
export interface CartItem {
  productId: number;
  name: string;
  picture?: string | null;
  price: number;
  quantity: number;
}
