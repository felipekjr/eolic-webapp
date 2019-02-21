import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';

import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SweetAlert2Module} from '@toverux/ngx-sweetalert2'
import {CoreModule} from './core/core.module';
import {ModalModule} from 'ngx-bootstrap';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    AppRoutingModule,
    HttpClientModule,
    ModalModule.forRoot(),
    SweetAlert2Module.forRoot(),
    ToastrModule.forRoot({
      preventDuplicates: true,
    })
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
