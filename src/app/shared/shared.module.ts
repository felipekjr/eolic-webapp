import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ModalModule} from 'ngx-bootstrap';
import {ModalHeaderModule} from './modal-header/modal-header.module';
import {ModalFooterModule} from './modal-footer/modal-footer.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ModalModule,
    ModalHeaderModule,
    ModalFooterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    CommonModule,
    ModalModule,
    ModalHeaderModule,
    ModalFooterModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }
