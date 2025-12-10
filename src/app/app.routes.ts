import { Routes } from '@angular/router';

import { ProductListComponent } from './paginas/product-list/product-list';
import { ProductDetailComponent } from './paginas/product-detail/product-detail';
import { ProductFormComponent } from './paginas/product-form/product-form';
import { ProductDeleteComponent } from './paginas/product-delete/product-delete';
import { LoginComponent } from './paginas/login/login';
import { RegisterComponent } from './paginas/register/register';
import { ReviewComponent } from './paginas/review/review';
import { CartComponent } from './paginas/cart/cart';
import { OrdersComponent } from './paginas/orders/orders';
import {QuienesSomos} from './paginas/quienes-somos/quienes-somos';

export const routes: Routes = [
  { path: '', component: ProductListComponent },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'reviews', component: ReviewComponent },
  { path: 'orders', component: OrdersComponent },

  { path: 'cart', component: CartComponent },

  {path: 'quienes-somos', component: QuienesSomos},

  { path: 'product/create', component: ProductFormComponent },
  { path: 'product/edit/:id', component: ProductFormComponent },
  { path: 'product/delete/:id', component: ProductDeleteComponent },
  { path: 'product/:id', component: ProductDetailComponent }
];
