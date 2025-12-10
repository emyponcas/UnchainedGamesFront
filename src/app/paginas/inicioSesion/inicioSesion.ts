import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/AuthService';

@Component({
  selector: 'app-inicioSesion',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './inicioSesion.html',
  styleUrls: ['./inicioSesion.css'],
})
export class InicioSesion {
  loginData = {
    email: '',
    password: ''
  };

  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin(): void {
    if (!this.loginData.email || !this.loginData.password) {
      this.errorMessage = 'Por favor, completa todos los campos';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('Login exitoso:', response);

        this.authService.setToken(response.token);
        this.authService.setCurrentUser(response.usuario);

        // Redirigir a HOME y recargar para actualizar el navbar
        this.router.navigate(['/home']).then(() => {
          window.location.reload();
        });
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error en login:', error);

        if (error.error && error.error.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = 'Error en el inicio de sesión. Verifica tus credenciales.';
        }
      }
    });
  }
}
