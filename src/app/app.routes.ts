import { Routes } from '@angular/router';

import { ProductListComponent } from './paginas/product-list/product-list';
import { ProductDetailComponent } from './paginas/product-detail/product-detail';
import { ProductFormComponent } from './paginas/product-form/product-form';
import { ProductDeleteComponent } from './paginas/product-delete/product-delete';


export const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'product/create', component: ProductFormComponent },
  { path: 'product/edit/:id', component: ProductFormComponent },
  { path: 'product/delete/:id', component: ProductDeleteComponent},
  { path: 'product/:id', component: ProductDetailComponent }

];
