import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Usuario } from '../_models/usuario.model';
import { HttpService } from './http.service';
import {AbstractCrudService} from './abstract-crud.service';
import {ParqueEolico} from '../_models/parque-eolico.model';

@Injectable({ providedIn: 'root' })
export class UserService extends AbstractCrudService<Usuario>{
    constructor(
      protected httpService: HttpService
    ) {
      super(httpService)
    }
    baseUrl :string = '/usuarios';

    getUsers() {
        return this.httpService.get(this.getUrlBase());
    }

    getUserById(id: number) {
        return this.httpService.get(this.getUrlBase() + '/' + id);
    }

    createUser(user: Usuario) {
        return this.httpService.post(this.getUrlBase(), user);
    }

    updateUser(user: Usuario) {
        return this.httpService.put(this.getUrlBase() + '/' + user.id, user);
    }

    deleteUser(id: number) {
        return this.httpService.delete(this.getUrlBase() + '/' + id);
    }
  getUrlBase(): string {
    return '/usuarios';
  }
}
