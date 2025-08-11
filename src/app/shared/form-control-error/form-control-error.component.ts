import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'tt-form-control-error',
  templateUrl: './form-control-error.component.html',
  styleUrls: ['./form-control-error.component.scss'],
})
export class FormControlErrorComponent {
  @Input() control: AbstractControl | null = null;
  @Input() fieldName: string = 'Este campo';

  get shouldShowError(): boolean {
    return !!(
      this.control?.invalid &&
      (this.control?.dirty || this.control?.touched)
    );
  }
}
