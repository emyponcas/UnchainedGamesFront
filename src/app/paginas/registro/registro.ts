import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/AuthService'; // 👈 Ruta y nombre corregido

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro.html',
  styleUrls: ['./registro.css'],
})
export class Registro {

  // Modelo para los datos del formulario
  userData = {
    name: '',
    surnames: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  };

  // Variables para mensajes y estado
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onRegister(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.validateForm()) {
      return;
    }

    this.isLoading = true;

    const registerData: {
      name: string;
      surnames: string;
      email: string;
      phoneNumber: string;
      password: string;
    } = {
      name: this.userData.name,
      surnames: this.userData.surnames,
      email: this.userData.email,
      phoneNumber: this.userData.phoneNumber,
      password: this.userData.password
    };

    this.authService.register(registerData).subscribe({
      next: (response: any) => {
        this.successMessage = '¡Registro exitoso! Redirigiendo...';
        this.isLoading = false;

        this.autoLoginAfterRegister();

        setTimeout(() => {
          this.router.navigate(['/home']).then(() => {
            window.location.reload();
          });
        }, 2000);
      },
      error: (error: any) => {
        this.isLoading = false;
        console.error('Error en registro:', error);

        if (error.status === 409) {
          this.errorMessage = 'El email ya está registrado.';
        } else if (error.status === 400) {
          this.errorMessage = 'Datos inválidos. Verifica la información.';
        } else {
          this.errorMessage = 'Error en el servidor. Intenta más tarde.';
        }
      }
    });
  }

  private validateForm(): boolean {
    if (!this.userData.name || !this.userData.email || !this.userData.password) {
      this.errorMessage = 'Por favor, completa todos los campos obligatorios.';
      return false;
    }

    if (this.userData.password !== this.userData.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return false;
    }

    if (this.userData.password.length < 6) {
      this.errorMessage = 'La contraseña debe tener al menos 6 caracteres.';
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.userData.email)) {
      this.errorMessage = 'Por favor, introduce un email válido.';
      return false;
    }

    return true;
  }

  private autoLoginAfterRegister(): void {
    const loginCredentials = {
      email: this.userData.email,
      password: this.userData.password
    };

    this.authService.login(loginCredentials).subscribe({
      next: (response: any) => {  // 👈 Tipado añadido
        console.log('Auto-login exitoso:', response);
      },
      error: (error: any) => {  // 👈 Tipado añadido
        console.warn('No se pudo hacer auto-login:', error);
      }
    });
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
