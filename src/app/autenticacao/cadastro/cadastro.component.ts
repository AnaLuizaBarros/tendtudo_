import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ToastService } from '../../shared/services/toast.service';
import { finalize, Subject, takeUntil } from 'rxjs';
import { UserService } from '../services/user.service';
import { passwordMatchValidator } from '../../validators/password-match.validators';
import { FormComponent } from '../../shared/directives/form.component';

@Component({
  selector: 'tt-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent
  extends FormComponent
  implements OnInit, OnDestroy
{
  form!: FormGroup;
  isLoading = signal(false);

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private toastService = inject(ToastService);
  private userService = inject(UserService);

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        address: ['', Validators.required],
        city: ['', Validators.required],
        country: ['', Validators.required],
        zip: ['', Validators.required],
        termsCheck: [false, Validators.requiredTrue],
      },
      {
        validators: passwordMatchValidator,
      }
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toastService.show(
        'Por favor, preencha todos os campos corretamente.',
        'error'
      );
      return;
    }

    this.isLoading = signal(true);

    const { confirmPassword, termsCheck, ...userData } = this.form.value;

    this.userService
      .register(userData)
      .pipe(
        finalize(() => (this.isLoading = signal(false))),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (newUser) => {
          console.log('Usuário cadastrado (simulado):', newUser);
          this.toastService.show('Cadastro realizado com sucesso!', 'success');
          setTimeout(() => {
            this.router.navigate(['/auth/login']);
          }, 1500);
        },
        error: (err) => {
          this.toastService.show(err.message, 'error');
        },
      });
  }
}
