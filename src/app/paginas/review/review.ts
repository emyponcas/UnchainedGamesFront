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

  // Ahora trabajamos SOLO con Observable
  reviews$!: Observable<Review[]>;

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.reviews$ = this.reviewService.getMyReviews();
  }
}
