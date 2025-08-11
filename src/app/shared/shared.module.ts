import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ToastComponent } from './toast/toast.component';
import { FormControlErrorComponent } from './form-control-error/form-control-error.component';
import { ProductRatingComponent } from './product-rating/product-rating.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ToastComponent,
    FormControlErrorComponent,
    ProductRatingComponent,
    LoadingSpinnerComponent,
  ],
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  exports: [
    HeaderComponent,
    FooterComponent,
    ToastComponent,
    FormControlErrorComponent,
    ProductRatingComponent,
    LoadingSpinnerComponent,
  ],
})
export class SharedModule {}
