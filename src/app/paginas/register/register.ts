import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { RegisterRequest } from '../../models/register-request.model';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class RegisterComponent {

  form: FormGroup;
  loading = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      surnames: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const password = this.form.get('password')?.value;
    const confirmPassword = this.form.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    this.loading = true;
    this.errorMessage = null;
    this.successMessage = null;

    const data: RegisterRequest = {
      name: this.form.get('name')?.value,
      surnames: this.form.get('surnames')?.value,
      email: this.form.get('email')?.value,
      phoneNumber: this.form.get('phoneNumber')?.value,
      password: password
    };

    this.authService.register(data).subscribe({
      next: () => {
        this.loading = false;
        this.successMessage = 'Usuario creado correctamente. Ahora puedes iniciar sesión.';
        // opcional: redirigir directamente al login
        this.router.navigate(['/login']);
      },
      error: err => {
        console.error('Error al registrar usuario', err);
        this.loading = false;
        this.errorMessage = 'Error al registrar usuario. Revisa los datos o inténtalo más tarde.';
      }
    });
  }
}
