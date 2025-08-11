import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export function handleError(error: HttpErrorResponse) {
  let errorMessage = 'Ocorreu um erro desconhecido.';
  if (error.error instanceof ErrorEvent) {
    errorMessage = `Erro: ${error.error.message}`;
  } else {
    errorMessage =
      error.error?.message || `Erro ${error.status}: ${error.statusText}`;
  }
  console.error(`Erro na API: ${errorMessage}`);
  return throwError(
    () => new Error('Não foi possível completar a operação. Tente novamente.')
  );
}
