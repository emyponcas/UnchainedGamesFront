import { Routes } from '@angular/router';

import { ProductListComponent } from './paginas/product-list/product-list';
import { ProductDetailComponent } from './paginas/product-detail/product-detail';
import { ProductFormComponent } from './paginas/product-form/product-form';
import { ProductDeleteComponent } from './paginas/product-delete/product-delete';
import { Contact } from './paginas/contact/contact';
import { DatosPersonales } from './paginas/datos-personales/datos-personales';
import { LoginComponent } from './paginas/login/login';
import { RegisterComponent } from './paginas/register/register';
import { InicioSesion } from './paginas/inicio-sesion/inicio-sesion';
import { Registro } from './paginas/registro/registro';

export const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'product/create', component: ProductFormComponent },
  { path: 'product/edit/:id', component: ProductFormComponent },
  { path: 'product/delete/:id', component: ProductDeleteComponent},
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'contact', component: Contact },
  { path: 'datos-personales', component: DatosPersonales },
  { path: 'login', component: LoginComponent },
  { path: 'inicio-sesion', component: InicioSesion },
  { path: 'register', component: Registro }

];
