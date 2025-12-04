import { Routes } from '@angular/router';

import { ProductListComponent } from './paginas/product-list/product-list';
import { ProductDetailComponent } from './paginas/product-detail/product-detail';
import { ProductFormComponent } from './paginas/product-form/product-form';

export const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'product/create', component: ProductFormComponent },
  { path: 'product/:id', component: ProductDetailComponent }
];
