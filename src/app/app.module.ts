import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';

import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SweetAlert2Module} from '@toverux/ngx-sweetalert2'


import { LoginComponent} from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AerogeradorComponent } from './home/aerogerador/aerogerador.component';
import { ParqueEolicoComponent } from './home/parque-eolico/parque-eolico.component';
import { ComplexoEolicoComponent } from './home/complexo-eolico/complexo-eolico.component';
import { AerogeradorFormComponent } from './home/aerogerador/aerogerador-form/aerogerador-form.component';
import { ComplexoFormComponent } from './home/complexo-eolico/complexo-form/complexo-form.component';
import { ParqueFormComponent } from './home/parque-eolico/parque-form/parque-form.component';
import { HttpService} from './_services/http.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AerogeradorComponent,
    ParqueEolicoComponent,
    ComplexoEolicoComponent,
    AerogeradorFormComponent,
    ComplexoFormComponent,
    ParqueFormComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing,
    SweetAlert2Module.forRoot(),
    ToastrModule.forRoot({
      preventDuplicates: true,
    })
  ],
  // providers: [
  //   { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  //   { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  // ],

  bootstrap: [AppComponent]
})

export class AppModule { }
