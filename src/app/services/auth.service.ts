// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/usuario';

  constructor(private http: HttpClient) {}

  /**
   * Login: recibe el mismo "data" que ya usas en login.ts
   * (por ejemplo { email, password }).
   *
   * Usamos responseType 'text' para que Angular NO intente parsear JSON
   * y así evitamos el "status: 200, Unknown Error".
   */
  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data, {
      responseType: 'text' as 'json'
    })
      .pipe(
        tap((raw: any) => {
          console.log('[AUTH] Respuesta login RAW:', raw);

          let token: string | null = null;
          let rol: string | null = null;

          // Si viene texto
          if (typeof raw === 'string') {
            // Intentamos ver si en realidad es JSON en forma de string
            try {
              const parsed = JSON.parse(raw);
              const anyRes: any = parsed;
              token = anyRes.token || anyRes.jwt || anyRes.accessToken || null;
              rol   = anyRes.rol   || anyRes.role || null;
            } catch (_) {
              // No es JSON, asumimos que el propio string es el token
              token = raw.replace(/^"+|"+$/g, '').trim();
            }
          }
          // Si viene objeto (por si acaso el backend sí manda JSON estándar)
          else if (raw && typeof raw === 'object') {
            const anyRes: any = raw;
            token = anyRes.token || anyRes.jwt || anyRes.accessToken || null;
            rol   = anyRes.rol   || anyRes.role || null;
          }

          if (token) {
            localStorage.setItem('token', token);
            console.log('[AUTH] Token guardado en localStorage');
          } else {
            console.warn('[AUTH] No se ha encontrado token en la respuesta de login');
          }

          if (rol) {
            localStorage.setItem('rol', rol);
          }
        })
      );
  }

  /**
   * Registro: mantenemos la firma que ya utilizas
   * this.authService.register(data).subscribe(...)
   */
  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, data, {
      responseType: 'text' as 'json'
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const payloadBase64 = token.split('.')[1];
      const payloadJson = atob(payloadBase64);
      const payload = JSON.parse(payloadJson);

      const datos = payload.datos;
      // 👇 El backend mete "ADMIN" en el campo rol (lo vimos en el token)
      return datos?.rol === 'ADMIN';
    } catch (e) {
      console.error('[AUTH] Error al leer rol del token', e);
      return false;
    }
  }

}
