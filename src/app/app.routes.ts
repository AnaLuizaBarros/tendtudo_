import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultadoPesquisaComponent } from './produto/resultado-pesquisa/resultado-pesquisa.component';

export const routes: Routes = [
  { path: '', redirectTo: '/categoria/beauty', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./autenticacao/autenticacao.module').then(
        (m) => m.AutenticacaoModule
      ),
  },
  {
    path: 'categoria',
    loadChildren: () =>
      import('./produto/produto.module').then((m) => m.ProdutoModule),
  },
  { path: 'search', component: ResultadoPesquisaComponent },
  { path: '**', redirectTo: '/categoria/beauty' },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
