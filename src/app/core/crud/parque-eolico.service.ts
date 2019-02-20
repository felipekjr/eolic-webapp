import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ParqueEolico } from '../modelos/parque-eolico.model'
import {HttpService} from '../http/http.service';
import {AbstractCrudService} from './abstract-crud.service';
import { ParqueEolicoSharedService } from '../services/parque-eolico-shared.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ParqueEolicoService extends AbstractCrudService<ParqueEolico>{

  constructor(
   protected httpService: HttpService,
   private parqueEolicoSharedService : ParqueEolicoSharedService
  ) {
    super(httpService);
  }
  getChangeEmittedParqueEolico(): Observable<any> {
    return this.parqueEolicoSharedService.changeEmitted$;
  }
  getUrlBase(): string {
    return '/parque_eolico';
  }

}
