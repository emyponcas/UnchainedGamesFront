import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { ProductService } from '../../services/product';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product-form.html'
})
export class ProductFormComponent implements OnInit {

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
  };

  mensaje: string = '';

  // 👇 NUEVO: modo edición
  isEditMode: boolean = false;
  productId?: number;

  // 👇 NUEVO: archivo seleccionado
  selectedFile?: File;

  constructor(
    private productService: ProductService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');

      if (idParam) {
        this.isEditMode = true;
        this.productId = +idParam;
        this.cargarProducto();
      }
    });
  }

  cargarProducto(): void {
    if (!this.productId) return;

    this.productService.getById(this.productId).subscribe({
      next: (data) => {
        // Asumimos que el backend devuelve estas propiedades
        this.product = {
          name: data.name,
          description: data.description,
          price: data.price,
          stock: data.stock,
          recommendedAge: data.recommendedAge,
          playerMin: data.playerMin,
          playerMax: data.playerMax,
          duration: data.duration,
          picture: data.picture, // para vista previa
          boxSize: data.boxSize,
          difficulty: data.difficulty
        };
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar producto', err);
        this.mensaje = 'Error al cargar producto';
        this.cdr.detectChanges();
      }
    });
  }

  // 👇 NUEVO: cuando el usuario elige un archivo
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      // Si quisieras resetear el mensaje:
      // this.mensaje = '';
    }
  }

  onSubmit(): void {

    if (this.isEditMode && this.productId != null) {
      // 🔁 ACTUALIZAR DATOS
      this.productService.update(this.productId, this.product).subscribe({
        next: () => {

          // Ahora, si hay una imagen seleccionada, la subimos
          if (this.selectedFile) {
            this.productService.uploadProductPicture(this.productId!, this.selectedFile)
              .subscribe({
                next: () => {
                  this.mensaje = 'Producto actualizado correctamente (con imagen)';
                  this.cdr.detectChanges();
                },
                error: (err) => {
                  console.error('Error al subir la imagen', err);
                  this.mensaje = 'Producto actualizado, pero error al subir la imagen';
                  this.cdr.detectChanges();
                }
              });
          } else {
            this.mensaje = 'Producto actualizado correctamente';
            this.cdr.detectChanges();
          }

        },
        error: (err) => {
          console.error('Error al actualizar producto', err);
          this.mensaje = 'Error al actualizar producto';
          this.cdr.detectChanges();
        }
      });
    } else {
      // 🆕 CREAR (de momento sin imagen por archivo)
      this.productService.create(this.product).subscribe({
        next: () => {
          this.mensaje = 'Producto creado correctamente';
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error al crear producto', err);
          this.mensaje = 'Error al crear producto';
          this.cdr.detectChanges();
        }
      });
    }
  }

  volver(): void {
    this.router.navigate(['/']);
  }
}
