import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthResponse } from '../../models/auth.model';
interface UserSearchResponse {
  users: { username: string }[];
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private authTokenKey = 'authToken';
  private http = inject(HttpClient);
  private router = inject(Router);

  findUsernameByEmail(email: string): Observable<string | null> {
    return this.http
      .get<UserSearchResponse>(
        `${this.apiUrl}/users/filter?key=email&value=${email}`
      )
      .pipe(
        map((response) => {
          if (response.users && response.users.length > 0) {
            return response.users[0].username;
          }
          return null;
        }),
        catchError(this.handleError)
      );
  }

  login(credentials: {
    username: string;
    password: string;
  }): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/auth/login`, credentials)
      .pipe(
        tap((response) => {
          localStorage.setItem(this.authTokenKey, response.token);
        }),
        catchError(this.handleError)
      );
  }

  logout(): void {
    localStorage.removeItem(this.authTokenKey);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.authTokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocorreu um erro desconhecido.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      errorMessage = error.error.message || 'Credenciais inválidas.';
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
