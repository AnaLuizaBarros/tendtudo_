import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutoDetalheComponent } from './produto-detalhe/produto-detalhe.component';
import { ListagemComponent } from './listagem/listagem.component';
const routes: Routes = [
  { path: '', redirectTo: 'beauty', pathMatch: 'full' },
  { path: 'produto/:id', component: ProdutoDetalheComponent },
  { path: ':name', component: ListagemComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriaRoutingModule {}
