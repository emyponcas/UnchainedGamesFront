import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ProductService } from '../../services/product';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];

  // 🔍 filtros
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
    private cdr: ChangeDetectorRef
  ) {}

  // 👉 al entrar al catálogo, cargamos TODO
  ngOnInit(): void {
    this.cargarProductos();
  }

  // 📦 carga todo el catálogo sin filtros
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

  // 🖱️ botón "Buscar"
  onSearchClick(): void {
    const name = this.searchText.trim();
    const langs = this.selectedLanguages;

    // si no hay ningún filtro, mostramos todo
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
  // (la búsqueda se lanza al pulsar el botón)
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

  // 🔄 botón "Limpiar filtros"
  onClearFilters(): void {
    this.searchText = '';
    this.selectedLanguages = [];
    this.cargarProductos();
  }
}
