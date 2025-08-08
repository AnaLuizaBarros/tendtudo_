import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AutenticacaoRoutingModule } from './autenticacao-routing.module';

@NgModule({
  declarations: [LoginComponent, CadastroComponent],
  imports: [CommonModule, FormsModule, AutenticacaoRoutingModule],
  exports: [LoginComponent, CadastroComponent],
})
export class AutenticacaoModule {}
