import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'tt-product-rating',
  templateUrl: './product-rating.component.html',
  styleUrls: ['./product-rating.component.scss'],
})
export class ProductRatingComponent implements OnChanges {
  @Input() product!: Product;

  fullStars: any[] = [];
  priceInteger = '0';
  priceCents = '00';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && this.product) {
      this.calculateStars();
      this.formatPrice();
    }
  }

  private calculateStars(): void {
    const rating = this.product.rating || 0;
    const roundedRating = Math.round(rating * 2) / 2;
    const fullStarCount = Math.floor(roundedRating);

    this.fullStars = Array(fullStarCount).fill(0);
  }

  private formatPrice(): void {
    const price = this.product.price || 0;
    const [integer, cents] = price.toFixed(2).split('.');
    this.priceInteger = integer;
    this.priceCents = cents;
  }
}
