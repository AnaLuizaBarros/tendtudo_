import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { ToastState } from '../../models/toastState.model';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'tt-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [
    trigger('toastAnimation', [
      state('void', style({ transform: 'translateY(100%)', opacity: 0 })),
      transition(':enter', [
        animate(
          '300ms ease-out',
          style({ transform: 'translateY(0)', opacity: 1 })
        ),
      ]),
      transition(':leave', [
        animate(
          '300ms ease-in',
          style({ transform: 'translateY(100%)', opacity: 0 })
        ),
      ]),
    ]),
  ],
})
export class ToastComponent implements OnInit, OnDestroy {
  isVisible = false;
  message = '';
  type: 'success' | 'error' = 'success';
  private subscription!: Subscription;
  private toastService = inject(ToastService);

  ngOnInit(): void {
    this.subscription = this.toastService.toastState.subscribe(
      (state: ToastState) => {
        if (state.isVisible) {
          this.isVisible = true;
          this.message = state.message;
          this.type = state.type;

          setTimeout(() => this.toastService.hide(), 3000);
        } else {
          this.isVisible = false;
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
