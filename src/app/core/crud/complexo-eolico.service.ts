import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ComplexoEolico } from '../modelos/complexo-eolico.model.'
import { HttpService } from '../http/http.service';
import {AbstractCrudService} from './abstract-crud.service';
import {Usuario} from '../modelos/usuario.model';
import {Observable} from 'rxjs';
import {ComplexoEolicoSharedService} from '../services/complexo-eolico-shared.service';

@Injectable({
  providedIn: 'root'
})
export class ComplexoEolicoService extends AbstractCrudService<ComplexoEolico>{

  constructor(
    protected httpService: HttpService,
    private complexoEolicoSharedService : ComplexoEolicoSharedService
  ) {
    super(httpService)
  }
  
  getChangeEmittedComplexoEolico(): Observable<any> {
    return this.complexoEolicoSharedService.changeEmitted$;
  }


  getUrlBase(): string {
      return '/complexo_eolico';
    }
}
