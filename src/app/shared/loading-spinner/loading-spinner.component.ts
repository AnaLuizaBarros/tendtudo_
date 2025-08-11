import { Component, Input } from '@angular/core';

@Component({
  selector: 'tt-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.scss',
})
export class LoadingSpinnerComponent {
  @Input() size: 'sm' | 'md' = 'md';

  get spinnerClasses(): Record<string, boolean> {
    return {
      spinner: true,
      'spinner-sm': this.size === 'sm',
      'spinner-md': this.size === 'md',
    };
  }
}
