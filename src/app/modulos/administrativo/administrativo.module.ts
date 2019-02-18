import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from './home/home.component';
import {AerogeradorComponent} from './home/aerogerador/aerogerador.component';
import {AerogeradorFormComponent} from './home/aerogerador/aerogerador-form/aerogerador-form.component';
import {ParqueEolicoComponent} from './home/parque-eolico/parque-eolico.component';
import {ParqueFormComponent} from './home/parque-eolico/parque-form/parque-form.component';
import {ComplexoEolicoComponent} from './home/complexo-eolico/complexo-eolico.component';
import {ComplexoFormComponent} from './home/complexo-eolico/complexo-form/complexo-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthGuard} from '../../core/guards/auth.guard';
import {AuthenticationService} from '../../core/http/authentication.service';
import {HttpService} from '../../core/http/http.service';
import {AdministrativoRoutingModule} from './administrativo-routing.module';
import { AdministrativoComponent } from './administrativo.component';



@NgModule({
  declarations: [
    HomeComponent,
    AerogeradorComponent,
    AerogeradorFormComponent,
    ParqueEolicoComponent,
    ParqueFormComponent,
    ComplexoEolicoComponent,
    ComplexoFormComponent,
    AdministrativoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdministrativoRoutingModule
  ],
  providers:[
    AuthGuard,
    AuthenticationService,
    HttpService
  ],
})
export class AdministrativoModule { }
