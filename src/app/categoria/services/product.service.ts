import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Product } from '../../models/product.model';

export interface PaginatedResponse {
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
}
