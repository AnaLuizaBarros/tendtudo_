import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product, PaginatedResponse } from '../../models/product.model';
import { environment } from '../../environments/environment';
import { handleError } from '../../utils/error-handler';

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
  ): Observable<PaginatedResponse<Product>> {
    const skip = (page - 1) * limit;
    const url = `${this.baseUrl}/category/${category}?limit=${limit}&skip=${skip}`;
    return this.http
      .get<PaginatedResponse<Product>>(url)
      .pipe(catchError(handleError));
  }

  getProductById(id: string): Observable<Product> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Product>(url).pipe(catchError(handleError));
  }

  searchProducts(query: string): Observable<PaginatedResponse<Product>> {
    const url = `${this.baseUrl}/search?q=${query}`;
    return this.http
      .get<PaginatedResponse<Product>>(url)
      .pipe(catchError(handleError));
  }
}
