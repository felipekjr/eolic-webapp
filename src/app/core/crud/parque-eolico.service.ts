import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ParqueEolico } from '../modelos/parque-eolico.model'
import {HttpService} from '../http/http.service';
import {AbstractCrudService} from './abstract-crud.service';

@Injectable({
  providedIn: 'root'
})
export class ParqueEolicoService extends AbstractCrudService<ParqueEolico>{

  constructor(
   protected httpService: HttpService
  ) {
    super(httpService);
  }
    getUrlBase(): string {
      return '/parque_eolico';
    }

}