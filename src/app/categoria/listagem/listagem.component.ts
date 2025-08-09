import {
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { SortOption, Product, SORT_OPTIONS } from '../../models/product.model';

@Component({
  selector: 'tt-listagem',
  templateUrl: './listagem.component.html',
  styleUrl: './listagem.component.scss',
})
export class ListagemComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);

  category = signal<string>('');
  currentPage = signal<number>(1);
  sortOption = signal<SortOption>('relevance');
  isDropdownOpen = signal(false);

  @ViewChild('dropdownContainer') dropdownContainerRef!: ElementRef;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (
      this.isDropdownOpen() &&
      !this.dropdownContainerRef.nativeElement.contains(event.target)
    ) {
      this.isDropdownOpen.set(false);
    }
  }

  private rawProducts = signal<Product[]>([]);
  totalProducts = signal<number>(0);
  readonly productsPerPage = 5;

  readonly sortOptions = SORT_OPTIONS;

  toggleDropdown(): void {
    this.isDropdownOpen.update((value) => !value);
  }

  selectSortOption(option: SortOption): void {
    this.sortOption.set(option);
    this.isDropdownOpen.set(false);
  }

  products = computed(() => {
    const products = this.rawProducts();
    const sort = this.sortOption();
    const sorted = [...products];

    switch (sort) {
      case 'priceAsc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'priceDesc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'relevance':
      default:
        return products;
    }
  });

  totalPages = computed(() =>
    Math.ceil(this.totalProducts() / this.productsPerPage)
  );
  pages = computed(() =>
    Array.from({ length: this.totalPages() }, (_, i) => i + 1)
  );

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.category.set(params.get('name')!);
      this.currentPage.set(1);
    });
    this.getProducts();
  }

  getProducts(): void {
    const cat = this.category();
    const page = this.currentPage();
    this.productService
      .getProductsByCategory(cat, page, this.productsPerPage)
      .subscribe((response) => {
        this.rawProducts.set(response.products);
        this.totalProducts.set(response.total);
      });
  }

  changePage(newPage: number): void {
    if (newPage > 0 && newPage <= this.totalPages()) {
      this.currentPage.set(newPage);
      this.getProducts();
    }
  }

  onSortChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement)
      .value as SortOption;
    this.sortOption.set(selectedValue);
  }
}
