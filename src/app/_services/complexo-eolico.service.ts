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
  baseUrl: string = '/complexo_eolico';

    getComplexos() {
        // return this.http.get<Complexo[]>(this.getUrlBase);
      return this.httpService.get(this.getUrlBase());
    }

    getComplexoById(id: number) {
      return this.httpService.get(this.getUrlBase() + '/' + id);
    }

    createComplexo(complexo: ComplexoEolico) {
        return this.httpService.post(this.getUrlBase(), complexo);
    }

    updateComplexo(complexo: ComplexoEolico) {
        return this.httpService.put(this.getUrlBase() + '/' + complexo.id, complexo);
    }

    deleteComplexo(id: number) {
        return this.httpService.delete(this.getUrlBase() + '/' + id);
    }
    getUrlBase(): string {
      return 'complexo-eolico';
    }
}
