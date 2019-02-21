import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ModalModule} from 'ngx-bootstrap';
import {ModalHeaderModule} from './componentes/modal-header/modal-header.module';
import {ModalFooterModule} from './componentes/modal-footer/modal-footer.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NoWhitespaceDirective} from './diretivas/no-whitespace.directive';
import {OnlyNumberDirective} from './diretivas/only-number.directive';
import {HeaderModule} from './componentes/header/header.module';
import {HeaderComponent} from './componentes/header/header.component';



@NgModule({
  declarations: [NoWhitespaceDirective, OnlyNumberDirective],
  imports: [
    CommonModule,
    ModalModule,
    ModalHeaderModule,
    ModalFooterModule,
    HeaderModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    CommonModule,
    ModalModule,
    ModalHeaderModule,
    ModalFooterModule,
    HeaderModule,
    FormsModule,
    ReactiveFormsModule,
    NoWhitespaceDirective,
    OnlyNumberDirective
  ]
})
export class SharedModule { }
