import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Usuario } from '../modelos/usuario.model';
import { HttpService } from '../http/http.service';
import {AbstractCrudService} from './abstract-crud.service';
import {ParqueEolico} from '../modelos/parque-eolico.model';

@Injectable({ providedIn: 'root' })
export class UserService extends AbstractCrudService<Usuario>{
    constructor(
      protected httpService: HttpService
    ) {
      super(httpService)
    }

  getUrlBase(): string {
    return '/usuarios';
  }
}
