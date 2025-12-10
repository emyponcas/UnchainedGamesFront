import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
  imports: [CommonModule, RouterLink, RouterLinkActive]
})
export class NavbarComponent implements OnInit {

  totalItems = 0;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cartService.items$.subscribe(items => {
      this.totalItems = items.reduce((acc, i) => acc + i.quantity, 0);
    });
  }

  // usado en el template: *ngIf="isLoggedIn"
  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  // (click)="goToLogin()"
  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  // (click)="goToRegister()"
  goToRegister(): void {
    this.router.navigate(['/register']);
  }

  // (click)="logout()"
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
