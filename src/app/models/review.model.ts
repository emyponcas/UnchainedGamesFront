// src/app/models/review.model.ts

export interface ReviewMostrarDTO {
  id: number;
  score: number;
  description: string;
  datetime: string;

  usuarioId: number;
  usuarioName: string;

  productId: number;
  productName: string;
  productPicture?: string | null;
}

// Alias
export type Review = ReviewMostrarDTO;

export interface ReviewCreateDTO {
  productId: number;
  score: number;
  description: string;
}
