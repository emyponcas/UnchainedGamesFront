import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product';

@Component({
  standalone: true,
  template: '<p>Eliminando producto...</p>'
})
export class ProductDeleteComponent {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) return;

    this.productService.delete(+id).subscribe({
      next: () => this.router.navigate(['/']),
      error: () => alert('Error al eliminar producto')
    });
  }
}
