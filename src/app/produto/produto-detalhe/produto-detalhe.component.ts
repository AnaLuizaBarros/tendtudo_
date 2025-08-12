import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../services/product.service';
import { finalize } from 'rxjs';
import { Location } from '@angular/common';
import { ToastService } from '../../shared/services/toast.service';

@Component({
  selector: 'tt-produto-detalhe',
  templateUrl: './produto-detalhe.component.html',
  styleUrl: './produto-detalhe.component.scss',
})
export class ProdutoDetalheComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private location = inject(Location);
  private toastService = inject(ToastService);
  isLoading = signal(true);

  product = signal<Product | undefined>(undefined);
  isFavorite = signal(false);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.getProduct(id);
    }
  }

  goBack(): void {
    this.location.back();
  }

  toggleFavorite(): void {
    this.isFavorite.update((value) => !value);
  }

  private getProduct(id: string): void {
    this.isLoading = signal(true);

    this.productService
      .getProductById(id)
      .pipe(finalize(() => (this.isLoading = signal(false))))
      .subscribe((productData) => {
        this.product.set(productData);
      });
  }
  public addCart(): void {
    this.toastService.show('Produto adicionado ao carrinho!', 'success');
    console.log('add');
  }
}
