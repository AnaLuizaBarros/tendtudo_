import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'tt-produto-detalhe',
  templateUrl: './produto-detalhe.component.html',
  styleUrl: './produto-detalhe.component.scss',
})
export class ProdutoDetalheComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private router = inject(Router);

  product = signal<Product | undefined>(undefined);

  isFavorite = signal(false);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.productService.getProductById(id).subscribe((productData) => {
        this.product.set(productData);
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/categoria/beauty']);
  }

  toggleFavorite(): void {
    this.isFavorite.update((value) => !value);
  }
}
