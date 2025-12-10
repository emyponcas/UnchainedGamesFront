import { Routes } from '@angular/router';
import { Home } from './paginas/home/home';
import { InicioSesion } from './paginas/inicioSesion/inicioSesion';
import { Registro } from './paginas/registro/registro';
import {QuienesSomos} from './paginas/quienes-somos/quienes-somos';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'login', component: InicioSesion },
  { path: 'registro', component: Registro },
  { path: 'featured', component: Home },
  { path: 'reviews', component: Home },
  { path: 'contact', component: Home },
  { path: 'quienes-somos', component: QuienesSomos },
  { path: '**', redirectTo: '/home' }
];
