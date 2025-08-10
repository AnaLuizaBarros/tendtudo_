import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ToastState } from '../../models/toastState.model';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastSubject = new Subject<ToastState>();
  public toastState = this.toastSubject.asObservable();

  show(message: string, type: 'success' | 'error' = 'success') {
    this.toastSubject.next({ message, type, isVisible: true });
  }

  hide() {
    this.toastSubject.next({ message: '', type: 'success', isVisible: false });
  }
}
