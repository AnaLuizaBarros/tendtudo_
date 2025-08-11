import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const KEY = 'token';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  salvarToken(token: string) {
    if (this.isBrowser) {
      localStorage.setItem(KEY, token);
    }
  }

  excluirToken() {
    if (this.isBrowser) {
      localStorage.removeItem(KEY);
    }
  }

  retornarToken(): string {
    if (this.isBrowser) {
      return localStorage.getItem(KEY) ?? '';
    }
    return '';
  }

  possuiToken(): boolean {
    return !!this.retornarToken();
  }
}
