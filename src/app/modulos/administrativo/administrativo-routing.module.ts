import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AdministrativoComponent} from './administrativo.component';
import {AuthGuard} from '../../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AdministrativoComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrativoRoutingModule { }
