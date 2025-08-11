import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastService } from '../shared/services/toast.service';
import { catchError, throwError } from 'rxjs';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const authService = inject(AuthService);
  const toastService = inject(ToastService);

  const apiBaseUrl = 'https://dummyjson.com';

  const isApiRequest = req.url.startsWith(apiBaseUrl);
  if (!isApiRequest) {
    return next(req);
  }

  const authToken = tokenService.retornarToken();
  let authReq = req;

  if (authToken) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  }

  return next(authReq).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          toastService.show(
            'Sua sessão expirou. Por favor, faça login novamente.',
            'error'
          );
          authService.logout();
        } else {
          toastService.show(
            'Ocorreu um erro. Tente novamente mais tarde.',
            'error'
          );
        }
      }
      return throwError(() => err);
    })
  );
};
