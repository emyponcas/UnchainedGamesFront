import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProductService } from '../../services/product';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list.html'
})
export class ProductListComponent {

  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) {

    this.productService
      .getAll()
      .subscribe({
        next: (data: Product[]) => {
          this.products = data;

          // ✅ Mantenemos la solución que hace estable el render
          this.cdr.detectChanges();
        },
        error: err => console.error('ERROR:', err)
      });

  }
}
