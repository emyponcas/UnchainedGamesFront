import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { ProductService } from '../../services/product';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.html'
})
export class ProductDetailComponent {

  product?: Product;
  id: number = 0;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) {

    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? Number(idParam) : 0;

    this.productService
      .getById(this.id)
      .subscribe({
        next: (data: Product) => {
          this.product = data;
          this.cdr.detectChanges();
        },
        error: err => console.error(err)
      });

  }
}
