import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ListagemComponent } from './listagem/listagem.component';
import { ProdutoDetalheComponent } from './produto-detalhe/produto-detalhe.component';
import { ProdutoRoutingModule } from './produto-routing.module';
import { ResultadoPesquisaComponent } from './resultado-pesquisa/resultado-pesquisa.component';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [
    ListagemComponent,
    ProdutoDetalheComponent,
    ResultadoPesquisaComponent,
    CardComponent,
  ],
  imports: [CommonModule, ProdutoRoutingModule, SharedModule],
  exports: [ListagemComponent],
})
export class ProdutoModule {}
