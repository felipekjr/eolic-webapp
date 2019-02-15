import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ComplexoEolico } from '../_models/complexo-eolico.model.'
import { HttpService } from './http.service';
import {AbstractCrudService} from './abstract-crud.service';
import {Usuario} from '../_models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class ComplexoEolicoService extends AbstractCrudService<ComplexoEolico>{

  constructor(
    protected httpService: HttpService
  ) {
    super(httpService)
  }

    getUrlBase(): string {
      return '/complexo_eolico';
    }
}
