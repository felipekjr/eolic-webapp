import { Injectable } from '@angular/core';
import { HttpService} from '../http/http.service';
import { Aerogerador } from '../modelos/aerogerador.model'
import {AbstractCrudService} from './abstract-crud.service';
import {Observable} from 'rxjs';
import {ComplexoEolicoSharedService} from '../services/complexo-eolico-shared.service';
import {AerogeradorSharedService} from '../services/aerogerador-shared.service';

@Injectable({
  providedIn: 'root'
})
export class AerogeradorService extends AbstractCrudService<Aerogerador> {

  constructor(
    protected httpService: HttpService,
    private aerogeradorSharedService : AerogeradorSharedService
  ) {
    super(httpService)
    }

  getChangeEmittedAerogerador(): Observable<any> {
    return this.aerogeradorSharedService.changeEmitted$;
  }


  getUrlBase(): string {
      return '/aerogerador';
    }
}
