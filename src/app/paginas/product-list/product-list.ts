import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ProductService } from '../../services/product';
import { Product } from '../../models/product.model';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];

  MenuFvisible = false;

  toggleMenu() {
    this.MenuFvisible = !this.MenuFvisible;
  }

  // filtros
  searchText: string = '';
  selectedLanguages: string[] = [];

  // idiomas disponibles en la barra de filtros
  availableLanguages: string[] = [
    'Español',
    'Inglés',
    'Francés',
    'Alemán',
    'Italiano'
  ];

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService  // 👈 inyectamos AuthService
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  cargarProductos(): void {
    this.productService
      .getAll()
      .subscribe({
        next: (data: Product[]) => {
          console.log('PRODUCTOS QUE LLEGAN DEL BACK:', data);
          this.products = data;
          this.cdr.detectChanges();
        },
        error: (err: any) => console.error('ERROR AL CARGAR PRODUCTOS:', err)
      });
  }

  onSearchClick(): void {
    const name = this.searchText.trim();
    const langs = this.selectedLanguages;

    if (!name && langs.length === 0) {
      this.cargarProductos();
      return;
    }

    this.productService.search(name, langs)
      .subscribe({
        next: data => {
          console.log('RESULTADOS BUSQUEDA:', data);
          this.products = data;
        },
        error: err => console.error('ERROR EN BÚSQUEDA:', err)
      });
  }

  // cuando marcas/desmarcas un idioma, solo actualiza el array
  onLanguageChange(event: Event, lang: string): void {
    const checked = (event.target as HTMLInputElement).checked;

    if (checked) {
      if (!this.selectedLanguages.includes(lang)) {
        this.selectedLanguages.push(lang);
      }
    } else {
      this.selectedLanguages = this.selectedLanguages.filter(l => l !== lang);
    }
  }

  // botón "Limpiar filtros"
  onClearFilters(): void {
    this.searchText = '';
    this.selectedLanguages = [];
    this.cargarProductos();
  }
}
