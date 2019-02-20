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
import {ComplexoEolicoSharedService} from '../../core/services/complexo-eolico-shared.service';
import {ModalModule} from 'ngx-bootstrap';
import {ComplexoEolicoService} from '../../core/crud/complexo-eolico.service';
import {SharedModule} from '../../shared/shared.module';
import {ModalHeaderModule} from '../../shared/modal-header/modal-header.module';
import {ModalFooterModule} from '../../shared/modal-footer/modal-footer.module';
import { ParqueEolicoService } from '../../core/crud/parque-eolico.service';
import { ParqueEolicoSharedService } from '../../core/services/parque-eolico-shared.service';



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
    AdministrativoRoutingModule,
    SharedModule
  ],
  providers:[
    AuthGuard,
    AuthenticationService,
    HttpService,
    ParqueEolicoService,
    ParqueEolicoSharedService,
    ComplexoEolicoService,
    ComplexoEolicoSharedService    
  ],
})
export class AdministrativoModule { }
