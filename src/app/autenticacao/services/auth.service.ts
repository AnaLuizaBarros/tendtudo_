import { TokenService } from './token.service';
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthResponse } from '../../models/auth.model';
import { environment } from '../../environments/environment';
import { handleError } from '../../utils/error-handler';
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
        catchError(handleError)
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
        catchError(handleError)
      );
  }

  logout(): void {
    this.tokenService.excluirToken();
    this.router.navigate(['/auth/login']);
  }

  isAuthenticated(): boolean {
    return this.tokenService.possuiToken();
  }
}
