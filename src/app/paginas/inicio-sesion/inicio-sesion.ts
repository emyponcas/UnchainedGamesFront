import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router, RouterLink} from '@angular/router';
import {LoginRequest} from '../../models/login-request.model';

@Component({
  selector: 'app-inicio-sesion',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './inicio-sesion.html',
  styleUrl: './inicio-sesion.css',
  standalone: true
})

export class InicioSesion {

  form: FormGroup;
  loading = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // aquí sí se puede usar fb porque ya está inyectado
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = null;

    // forzamos el tipo para que cuadre con LoginRequest
    const data: LoginRequest = this.form.value as LoginRequest;

    this.authService.login(data).subscribe({
      next: () => {
        this.loading = false;
        // después de loguear, volvemos al listado principal
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Error en login', err);
        this.loading = false;
        this.errorMessage = 'Credenciales incorrectas o error en el servidor';
      }
    });
  }

}
