import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Parque } from '../_models/parque'


@Injectable({
  providedIn: 'root'
})
export class ParqueService {

  constructor(private http: HttpClient) { }
  baseUrl: string = 'https://eolic-api.herokuapp.com/api/parque_eolico';
    getParques() {
        return this.http.get<Parque[]>(this.baseUrl);
    }

    getParqueById(id: number) {
        return this.http.get<Parque>(this.baseUrl + '/' + id);
    }

    createParque(parque: Parque) {
        return this.http.post(this.baseUrl, parque);
    }

    updateParque(parque: Parque) {
        return this.http.put(this.baseUrl + '/' + parque.id, parque);
    }

    deleteParque(id: number) {
        return this.http.delete(this.baseUrl + '/' + id);
    }  
}
