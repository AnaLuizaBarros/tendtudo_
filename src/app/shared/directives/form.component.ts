import { Directive } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive()
export abstract class FormComponent {
  abstract form: FormGroup;

  showPassword = false;
  showConfirmPassword = false;

  public getControl(controlName: string) {
    return this.form.get(controlName);
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
