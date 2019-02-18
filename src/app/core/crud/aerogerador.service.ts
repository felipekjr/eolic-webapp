import { Injectable } from '@angular/core';
import { HttpService} from '../http/http.service';
import { Aerogerador } from '../modelos/aerogerador.model'
import {AbstractCrudService} from './abstract-crud.service';

@Injectable({
  providedIn: 'root'
})
export class AerogeradorService extends AbstractCrudService<Aerogerador> {

  constructor(
    protected httpService: HttpService
  ) {
    super(httpService)
    }

    getUrlBase(): string {
      return '/aerogerador';
    }
}
