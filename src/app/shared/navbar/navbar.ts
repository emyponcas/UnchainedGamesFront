import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
  imports: [CommonModule, RouterLink, RouterLinkActive]
})
export class NavbarComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // ✅ usado en el template: *ngIf="isLoggedIn"
  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  // ✅ usado en el template: (click)="goToLogin()"
  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  // ✅ usado en el template: (click)="logout()"
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
