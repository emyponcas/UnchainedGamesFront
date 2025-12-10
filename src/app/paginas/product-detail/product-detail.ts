import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Observable, map, filter, distinctUntilChanged, finalize, switchMap, tap } from 'rxjs';

import { ProductService } from '../../services/product';
import { Product } from '../../models/product.model';
import { AuthService } from '../../services/auth.service';
import { ReviewService } from '../../services/review.service';
import { Review, ReviewCreateDTO } from '../../models/review.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.css']
})
export class ProductDetailComponent implements OnInit {

  // ahora trabajamos con observables
  product$!: Observable<Product>;
  reviews$!: Observable<Review[]>;

  // id actual del producto (para enviar reseñas)
  private currentProductId: number = 0;

  // estado del formulario de reseña
  showReviewForm = false;
  newReviewScore: number | null = null;
  newReviewDescription: string = '';
  submittingReview = false;
  reviewFormError: string | null = null;
  reviewFormSuccess: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private authService: AuthService,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {

    const id$ = this.route.paramMap.pipe(
      map(params => Number(params.get('id') || 0)),
      filter(id => !!id),
      distinctUntilChanged(),
      tap(id => {
        console.log('DETAIL - id ruta:', id);
        this.currentProductId = id;
        this.resetReviewFormMessages();
      })
    );

    // PRODUCTO
    this.product$ = id$.pipe(
      switchMap(id => this.productService.getById(id)),
      tap(p => console.log('DETAIL - producto cargado:', p))
    );

    // RESEÑAS
    this.reviews$ = id$.pipe(
      switchMap(id => this.reviewService.getByProduct(id)),
      tap(r => console.log('DETAIL - reseñas cargadas:', r))
    );
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  toggleReviewForm(): void {
    if (!this.isLoggedIn) return;
    this.showReviewForm = !this.showReviewForm;
    this.resetReviewFormMessages();
  }

  private resetReviewFormMessages(): void {
    this.reviewFormError = null;
    this.reviewFormSuccess = null;
  }

  enviarReview(): void {
    if (!this.currentProductId) return;

    this.resetReviewFormMessages();

    if (!this.isLoggedIn) {
      this.reviewFormError = 'Debes iniciar sesión para reseñar.';
      return;
    }

    if (!this.newReviewScore || this.newReviewScore < 1 || this.newReviewScore > 5) {
      this.reviewFormError = 'Selecciona una puntuación entre 1 y 5.';
      return;
    }

    if (!this.newReviewDescription.trim()) {
      this.reviewFormError = 'Escribe un comentario para la reseña.';
      return;
    }

    const dto: ReviewCreateDTO = {
      productId: this.currentProductId,
      score: this.newReviewScore,
      description: this.newReviewDescription.trim()
    };

    this.submittingReview = true;

    this.reviewService
      .create(dto)
      .pipe(
        finalize(() => {
          this.submittingReview = false;
        })
      )
      .subscribe({
        next: (createdReview) => {
          this.reviewFormSuccess = 'Reseña enviada correctamente.';
          this.newReviewScore = null;
          this.newReviewDescription = '';

          // 🔄 recargamos las reseñas desde el backend (incluye la recién creada)
          this.reviews$ = this.reviewService
            .getByProduct(this.currentProductId)
            .pipe(
              tap(r => console.log('DETAIL - reseñas recargadas tras crear:', r))
            );
        },
        error: (err) => {
          console.error('DETAIL - error al crear reseña', err);
          this.reviewFormError = 'No se ha podido guardar la reseña.';
        }
      });
  }
}
