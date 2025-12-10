// src/app/paginas/my-reviews/my-reviews.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ReviewService } from '../../services/review.service';
import { Review } from '../../models/review.model';

@Component({
  selector: 'app-my-reviews',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './my-reviews.html',
  styleUrls: ['./my-reviews.css']
})
export class MyReviewsComponent implements OnInit {

  reviews: Review[] = [];
  isLoading = false;
  error: string | null = null;

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.loadMyReviews();
  }

  private loadMyReviews(): void {
    this.isLoading = true;
    this.error = null;

    this.reviewService.getMyReviews().subscribe({
      next: (data) => {
        console.log('MY-REVIEWS → cargadas:', data);
        this.reviews = data;
        this.isLoading = false;          // 👈 dejamos de cargar
      },
      error: (err) => {
        console.error('MY-REVIEWS → error:', err);
        this.error = 'No se han podido cargar tus reseñas.';
        this.isLoading = false;          // 👈 también dejamos de cargar en error
      }
    });
  }
}
