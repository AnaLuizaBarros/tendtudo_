import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
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
      import('./categoria/categoria.module').then((m) => m.CategoriaModule),
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
