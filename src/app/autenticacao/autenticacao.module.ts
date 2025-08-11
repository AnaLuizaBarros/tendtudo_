import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AutenticacaoRoutingModule } from './autenticacao-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NgxMaskDirective } from 'ngx-mask';

@NgModule({
  declarations: [LoginComponent, CadastroComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AutenticacaoRoutingModule,
    SharedModule,
    NgxMaskDirective,
  ],
  exports: [LoginComponent, CadastroComponent],
})
export class AutenticacaoModule {}
