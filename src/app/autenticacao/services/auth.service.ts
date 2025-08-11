import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthResponse } from '../../models/auth.model';
import { TokenService } from './token.service';
import { environment } from '../../environments/environment';

interface UserSearchResponse {
  users: { username: string }[];
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseApiUrl = environment.apiUrl;
  private tokenService = inject(TokenService);
  private http = inject(HttpClient);
  private router = inject(Router);

  findUsernameByEmail(email: string): Observable<string | null> {
    return this.http
      .get<UserSearchResponse>(
        `${this.baseApiUrl}/users/filter?key=email&value=${email}`
      )
      .pipe(
        map((response) => response.users?.[0]?.username || null),
        catchError(this.handleError)
      );
  }

  login(credentials: {
    username: string;
    password: string;
  }): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.baseApiUrl}/auth/login`, credentials)
      .pipe(
        tap((response) => {
          this.tokenService.salvarToken(response.accessToken);
        }),
        catchError(this.handleError)
      );
  }

  logout(): void {
    this.tokenService.excluirToken();
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.tokenService.possuiToken();
  }

  private handleError(error: HttpErrorResponse) {
    const errorMessage =
      error.error?.message || 'Credenciais inválidas ou erro de rede.';
    return throwError(() => new Error(errorMessage));
  }
}
