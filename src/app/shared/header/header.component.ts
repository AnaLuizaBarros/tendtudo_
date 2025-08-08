import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'tt-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  categorias: string[] = ['Beauty', 'Fragrances', 'Furniture', 'Groceries'];
}
