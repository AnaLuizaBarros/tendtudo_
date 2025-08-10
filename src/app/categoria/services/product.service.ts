import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';
import { environment } from '../../environments/environment.development';

export interface PaginatedResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface ApiResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = `${environment.apiUrl}/products`;
  private http = inject(HttpClient);

  getProductsByCategory(
    category: string,
    page: number,
    limit: number
  ): Observable<PaginatedResponse> {
    const skip = (page - 1) * limit;
    const url = `${this.baseUrl}/category/${category}?limit=${limit}&skip=${skip}`;

    return this.http.get<PaginatedResponse>(url);
  }
  getProductById(id: string): Observable<Product> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Product>(url);
  }
  searchProducts(query: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/search?q=${query}`);
  }
}
