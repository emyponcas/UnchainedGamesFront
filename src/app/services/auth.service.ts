import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginRequest } from '../models/login-request.model';
import { RegisterRequest } from '../models/register-request.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080';
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

  // 🔐 Auth

  login(data: LoginRequest): Observable<string> {
    return this.http.post(this.apiUrl + '/usuario/login', data, {
      responseType: 'text'
    }).pipe(
      tap(token => {
        this.saveToken(token);
      })
    );
  }

  register(data: RegisterRequest) {
    return this.http.post<void>(this.apiUrl + '/usuario/create', data);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // ============================================================
  // 🔐 ROLES

  /**
   * Extrae el rol desde el JWT (ADMIN o USUARIO)
   */
  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payloadBase64 = token.split('.')[1];
      const payloadJson = atob(payloadBase64);
      const payload = JSON.parse(payloadJson);

      // Tu JWTService guarda la info en "datos"
      return payload.datos?.rol ?? null;
    } catch (error) {
      console.error('Error leyendo el rol del token', error);
      return null;
    }
  }

  /**
   * Comprueba si el usuario logueado es ADMIN
   */
  isAdmin(): boolean {
    return this.getUserRole() === 'ADMIN';
  }

  /**
   * Comprueba si el usuario logueado es USUARIO normal
   */
  isUser(): boolean {
    return this.getUserRole() === 'USUARIO';
  }

}
