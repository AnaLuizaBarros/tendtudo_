import { NgModule } from '@angular/core';
import { CardComponent } from './card/card.component';
import { ListagemComponent } from './listagem/listagem.component';
import { CommonModule } from '@angular/common';
import { CategoriaRoutingModule } from './categoria-routing.module';
import { ProdutoDetalheComponent } from './produto-detalhe/produto-detalhe.component';

@NgModule({
  declarations: [ListagemComponent, ProdutoDetalheComponent],
  imports: [CommonModule, CardComponent, CategoriaRoutingModule],
  exports: [ListagemComponent],
})
export class CategoriaModule {}
