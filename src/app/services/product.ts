import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:8080/product';

  constructor(private http: HttpClient) {}

  // 🔹 LISTAR TODOS
  getAll(): Observable<Product[]> {
    // Si tu endpoint es /product/all → descomenta la línea correcta
    // return this.http.get<Product[]>(`${this.apiUrl}/all`);
    return this.http.get<Product[]>(`${this.apiUrl}/all`);
  }

  // 🔹 OBTENER UNO POR ID
  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  // 🔹 CREAR
  create(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/create`, product);
  }

  // 🔹 ACTUALIZAR
  update(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/update/${id}`, product);
  }

  // 🔹 BORRAR (si lo usas)
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // 🔍 BUSCADOR
  search(name?: string, languages?: string[]) {
    let params = new HttpParams();

    if (name && name.trim() !== '') {
      params = params.set('name', name.trim());
    }

    if (languages && languages.length) {
      languages.forEach(lang => {
        params = params.append('languages', lang);
      });
    }

    return this.http.get<Product[]>(`${this.apiUrl}/search`, { params });
  }

  uploadProductPicture(id: number, file: File) {
    const formData = new FormData();
    formData.append('file', file); // 👈 nombre EXACTO "file"

    return this.http.put<Product>(
      `${this.apiUrl}/update/${id}/picture`,
      formData
    );
  }


}
