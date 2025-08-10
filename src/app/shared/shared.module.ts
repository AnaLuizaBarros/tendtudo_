import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ToastComponent } from './toast/toast.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, ToastComponent],
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  exports: [HeaderComponent, FooterComponent, ToastComponent],
})
export class SharedModule {}
