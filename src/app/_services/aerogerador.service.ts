import { Injectable } from '@angular/core';
import { HttpService} from './http.service';
import { Aerogerador } from '../_models/aerogerador.model'
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

    getAerogeradores() {
        // return this.http.get<Aerogerador[]>(this.getUrlBase);
        return this.httpService.get(this.getUrlBase());
    }

    getAerogeradorById(id: number) {
        // return this.http.get<Aerogerador>(this.getUrlBase + '/' + id);
      return this.httpService.get(this.getUrlBase() + '/' + id);
    }

    createAerogerador(aerogerador: Aerogerador) {
        // return this.http.post(this.getUrlBase, aerogerador);
      return this.httpService.post(this.getUrlBase(), aerogerador);
    }

    updateAerogerador(aerogerador: Aerogerador) {
        // return this.http.put(this.getUrlBase + '/' + aerogerador.id, aerogerador);
      return this.httpService.put(this.getUrlBase(), aerogerador);
    }

    deleteAerogerador(id: number) {
        // return this.http.delete(this.getUrlBase + '/' + id);
      return this.httpService.delete(this.getUrlBase() + '/' + id);
    }
    getUrlBase(): string {
      return 'aerogerador';
    }
}
