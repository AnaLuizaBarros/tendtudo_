import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../services/product.service';
interface GroupedProducts {
  [key: string]: Product[];
}
@Component({
  selector: 'tt-resultado-pesquisa',
  templateUrl: './resultado-pesquisa.component.html',
  styleUrl: './resultado-pesquisa.component.scss',
})
export class ResultadoPesquisaComponent {
  groupedProducts: GroupedProducts = {};
  categoryKeys: string[] = [];
  searchQuery: string = '';
  isLoading: boolean = true;
  hasResults: boolean = false;
  private allowedCategories = [
    'beauty',
    'fragrances',
    'furniture',
    'groceries',
  ];
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);

  constructor() {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.searchQuery = params['q'];
      if (this.searchQuery) {
        this.fetchAndGroupProducts();
      }
    });
  }

  fetchAndGroupProducts(): void {
    this.isLoading = true;
    this.productService
      .searchProducts(this.searchQuery)
      .subscribe((response) => {
        const filteredProducts = response.products.filter((product) =>
          this.allowedCategories.includes(product.category)
        );

        this.groupedProducts = filteredProducts.reduce((acc, product) => {
          const category = product.category;
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(product);
          return acc;
        }, {} as GroupedProducts);

        this.categoryKeys = Object.keys(this.groupedProducts);
        this.hasResults = this.categoryKeys.length > 0;
        this.isLoading = false;
      });
  }
}
