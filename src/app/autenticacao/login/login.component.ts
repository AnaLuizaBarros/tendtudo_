import { Router } from '@angular/router';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import {
  catchError,
  finalize,
  of,
  Subject,
  switchMap,
  takeUntil,
  throwError,
} from 'rxjs';
import { ToastService } from '../../shared/services/toast.service';
import { FormComponent } from '../../shared/directives/form.component';

@Component({
  selector: 'tt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends FormComponent implements OnInit, OnDestroy {
  isLoading = signal(false);
  errorMessage: string | null = null;
  form!: FormGroup;
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private toastService = inject(ToastService);
  private destroy$ = new Subject<void>();

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
      rememberMe: [false],
    });
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = signal(true);
    const email = this.form.value.email;
    const password = this.form.value.senha;

    this.authService
      .findUsernameByEmail(email)
      .pipe(
        switchMap((username) => {
          if (!username) {
            return throwError(() => new Error('Email ou senha incorretos.'));
          }
          return this.authService.login({ username, password });
        }),
        catchError((err) => {
          this.toastService.show(err.message, 'error');
          return of(null);
        }),
        finalize(() => {
          this.isLoading = signal(false);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((response) => {
        if (response) {
          this.toastService.show('Login realizado com sucesso!', 'success');
          setTimeout(() => this.router.navigate(['/categoria/beauty']), 1000);
        }
      });
  }
}
