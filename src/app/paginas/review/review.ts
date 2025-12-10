import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { ReviewService } from '../../services/review.service';
import { Review } from '../../models/review.model';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './review.html',
  styleUrls: ['./review.css']
})
export class ReviewComponent implements OnInit {

  // seguimos trabajando con Observable + async pipe
  reviews$!: Observable<Review[]>;

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.loadReviews();
  }

  private loadReviews(): void {
    this.reviews$ = this.reviewService.getMyReviews();
  }

  deleteReview(r: Review): void {
    if (!r.id) {
      return;
    }

    const ok = window.confirm('¿Seguro que quieres eliminar esta reseña?');
    if (!ok) return;

    this.reviewService.delete(r.id).subscribe({
      next: () => {
        // recargamos la lista desde el backend
        this.loadReviews();
      },
      error: (err) => {
        console.error('Error al eliminar reseña', err);
        alert('No se ha podido eliminar la reseña.');
      }
    });
  }
}
