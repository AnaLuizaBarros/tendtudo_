import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'tt-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  categorias: string[] = ['beauty', 'fragrances', 'furniture', 'groceries'];
  public searchQuery: string = '';
  private router = inject(Router);

  public onSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search'], {
        queryParams: { q: this.searchQuery.trim() },
      });
      this.searchQuery = '';
    }
  }
}
