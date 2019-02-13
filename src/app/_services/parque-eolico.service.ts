import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ParqueEolico } from '../_models/parque-eolico.model'
import {HttpService} from './http.service';
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
    getParques() {
        return this.httpService.get(this.getUrlBase());
    }

    getParqueById(id: number) {
        return this.httpService.get(this.getUrlBase() + '/' + id);
    }

    createParque(parque: ParqueEolico) {
        return this.httpService.post(this.getUrlBase(), parque);
    }

    updateParque(parque: ParqueEolico) {
        return this.httpService.put(this.getUrlBase() + '/' + parque.id, parque);
    }

    deleteParque(id: number) {
        return this.httpService.delete(this.getUrlBase() + '/' + id);
    }
    getUrlBase(): string {
      return '/parque-eolico';
    }

}
