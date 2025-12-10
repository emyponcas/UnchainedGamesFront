import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../componentes/navbar/navbar';
import { FooterComponent } from '../../componentes/footer/footer';
import { ProductService } from '../../services/product';
import { AuthService } from '../../services/AuthService';
import { Product } from '../../models/product.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  products: Product[] = [];
  featuredProducts: Product[] = [];
  newProducts: Product[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private productService: ProductService,
    protected authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAll().subscribe({
      next: (data: Product[]) => {
        this.products = data;

        console.log('Productos cargados:', this.products.length);

        if (this.products.length === 0) {
          // Si no hay productos, usar los de ejemplo
          this.useFallbackProducts();
        } else if (this.products.length <= 3) {
          // Si hay 3 o menos, mostrarlos en ambas secciones
          this.featuredProducts = [...this.products];
          this.newProducts = [...this.products];
        } else if (this.products.length <= 6) {
          // Si hay entre 4 y 6, dividirlos
          const mid = Math.ceil(this.products.length / 2);
          this.featuredProducts = this.products.slice(0, mid);
          this.newProducts = this.products.slice(mid);
        } else {
          // Si hay más de 6, tomar los primeros 3 y los últimos 3
          this.featuredProducts = this.products.slice(0, 3);
          this.newProducts = this.products.slice(-3);
        }

        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar productos:', error);
        this.errorMessage = 'Error al cargar los productos. Mostrando productos de ejemplo.';
        this.isLoading = false;
        this.useFallbackProducts();
      }
    });
  }

  private useFallbackProducts(): void {

    this.featuredProducts = [
      {
        id: 1,
        name: 'Catan',
        picture: 'https://i.imgur.com/7yZK0kf.jpeg',
        playerMin: 3,
        playerMax: 4,
        duration: 90,
        price: 44.99,
        stock: 10,
        recommendedAge: '10+',
        boxSize: 'Medium',
        difficulty: 'Medium',
        description: 'Juego de estrategia',
        mechanics: [],
        categories: [],
        languages: []
      },
      {
        id: 2,
        name: 'Alhambra',
        picture: 'https://i.imgur.com/J7tRbCn.jpeg',
        playerMin: 3,
        playerMax: 4,
        duration: 90,
        price: 44.99,
        stock: 10,
        recommendedAge: '10+',
        boxSize: 'Medium',
        difficulty: 'Medium',
        description: 'Juego de construcción',
        mechanics: [],
        categories: [],
        languages: []
      },
      {
        id: 3,
        name: 'BANG! (¡LA BALA!)',
        picture: 'https://i.imgur.com/Jg5Rb5K.jpeg',
        playerMin: 3,
        playerMax: 4,
        duration: 90,
        price: 44.99,
        stock: 10,
        recommendedAge: '10+',
        boxSize: 'Medium',
        difficulty: 'Medium',
        description: 'Juego del oeste',
        mechanics: [],
        categories: [],
        languages: []
      }
    ];

    this.newProducts = [
      {
        id: 4,
        name: 'Carcassonne',
        picture: 'https://i.imgur.com/7Q2brlT.jpeg',
        playerMin: 3,
        playerMax: 4,
        duration: 90,
        price: 44.99,
        stock: 10,
        recommendedAge: '10+',
        boxSize: 'Medium',
        difficulty: 'Medium',
        description: 'Juego de construcción',
        mechanics: [],
        categories: [],
        languages: []
      },
      {
        id: 5,
        name: 'Munchkin DELUXE',
        picture: 'https://i.imgur.com/Nm7O6Zx.jpeg',
        playerMin: 3,
        playerMax: 4,
        duration: 90,
        price: 44.99,
        stock: 10,
        recommendedAge: '10+',
        boxSize: 'Medium',
        difficulty: 'Medium',
        description: 'Juego de cartas',
        mechanics: [],
        categories: [],
        languages: []
      },
      {
        id: 6,
        name: 'Virus!',
        picture: 'https://i.imgur.com/nJjRkKq.jpeg',
        playerMin: 3,
        playerMax: 4,
        duration: 90,
        price: 44.99,
        stock: 10,
        recommendedAge: '10+',
        boxSize: 'Medium',
        difficulty: 'Medium',
        description: 'Juego de cartas',
        mechanics: [],
        categories: [],
        languages: []
      }
    ];
  }

  addToCart(product: Product): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']); // opcional
      return;
    }

    console.log('Producto agregado:', product);
    alert(`${product.name} agregado al carrito`);
  }

}
