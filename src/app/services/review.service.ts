import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReviewMostrarDTO, ReviewCreateDTO } from '../models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private apiUrl = "http://localhost:8080/review";

  constructor(private http: HttpClient) {}

  // GET /review/product/{productId}
  getByProduct(productId: number): Observable<ReviewMostrarDTO[]> {
    return this.http.get<ReviewMostrarDTO[]>(`${this.apiUrl}/product/${productId}`);
  }

  // GET /review/me
  getMyReviews(): Observable<ReviewMostrarDTO[]> {
    return this.http.get<ReviewMostrarDTO[]>(`${this.apiUrl}/me`);
  }

  // POST /review/create
  create(dto: ReviewCreateDTO): Observable<ReviewMostrarDTO> {
    return this.http.post<ReviewMostrarDTO>(`${this.apiUrl}/create`, dto);
  }

  // PUT /review/update/{id}
  update(id: number, dto: ReviewCreateDTO): Observable<ReviewMostrarDTO> {
    return this.http.put<ReviewMostrarDTO>(`${this.apiUrl}/update/${id}`, dto);
  }

  // DELETE /review/{id}
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
