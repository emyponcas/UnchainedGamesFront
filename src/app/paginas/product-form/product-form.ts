import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { ProductService } from '../../services/product';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product-form.html'
})
export class ProductFormComponent {

  product: any = {
    name: '',
    description: '',
    price: 0,
    stock: 0,
    recommendedAge: '',
    playerMin: 0,
    playerMax: 0,
    duration: 0,
    picture: '',
    boxSize: '',
    difficulty: ''
    // si luego quieres meter mechanicsIds, categoriesIds, languagesIds,
    // se los añadimos aquí como arrays vacíos
  };

  mensaje: string = '';

  constructor(
    private productService: ProductService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  onSubmit(): void {
    this.productService.create(this.product).subscribe({
      next: () => {
        this.mensaje = 'Producto creado correctamente';
        this.cdr.detectChanges();
        // Si quieres volver automáticamente al catálogo:
        // this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Error al crear producto', err);
        this.mensaje = 'Error al crear producto';
        this.cdr.detectChanges();
      }
    });
  }

  volver(): void {
    this.router.navigate(['/']);
  }
}
