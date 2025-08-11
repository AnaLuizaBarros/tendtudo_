import { NgModule } from '@angular/core';
import { CardComponent } from './card/card.component';
import { ListagemComponent } from './listagem/listagem.component';
import { CommonModule } from '@angular/common';
import { CategoriaRoutingModule } from './categoria-routing.module';
import { ProdutoDetalheComponent } from './produto-detalhe/produto-detalhe.component';
import { ResultadoPesquisaComponent } from './resultado-pesquisa/resultado-pesquisa.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ListagemComponent,
    ProdutoDetalheComponent,
    ResultadoPesquisaComponent,
    CardComponent,
  ],
  imports: [CommonModule, CategoriaRoutingModule, SharedModule],
  exports: [ListagemComponent],
})
export class CategoriaModule {}
