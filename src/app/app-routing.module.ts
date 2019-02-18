import {RouterModule} from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [RouterModule.forRoot([
    {
      path: 'administrativo',
      loadChildren: './modulos/administrativo/administrativo.module#AdministrativoModule'
    },
    {
      path: 'login',
      loadChildren: './modulos/autenticacao/autenticacao.module#AutenticacaoModule'
    },
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'login'
    },
    { path: '**', redirectTo: 'login' }
  ])],
  exports: [RouterModule]
})

export class AppRoutingModule {
}

