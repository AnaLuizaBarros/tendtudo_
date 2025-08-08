import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginData } from '../../models/login.model';

@Component({
  selector: 'tt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm?: NgForm;

  public user: LoginData = {
    email: 'emily.johnson@x.dummyjson.com',
    password: 'emilyspass',
    rememberMe: false,
  };

  public showPassword = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      console.error('O formulário contém erros.');
      Object.values(form.controls).forEach((control) => {
        control.markAsTouched();
      });
      return;
    }

    console.log('Formulário enviado!');
    console.log('Valores:', form.value as LoginData);
  }
}
