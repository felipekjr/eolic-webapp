import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutenticacaoRoutingModule } from './autenticacao-routing.module';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthGuard} from '../../core/guards/auth.guard';
import {AuthenticationService} from '../../core/http/authentication.service';
import {HttpService} from '../../core/http/http.service';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AutenticacaoRoutingModule
  ],
  providers:[
    AuthGuard,
    AuthenticationService,
    HttpService
  ],

})
export class AutenticacaoModule { }
