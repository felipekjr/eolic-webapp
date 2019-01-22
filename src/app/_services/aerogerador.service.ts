import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Aerogerador } from '../_models/aerogerador'

@Injectable({
  providedIn: 'root'
})
export class AerogeradorService {

  constructor(private http: HttpClient) { }
  baseUrl: string = 'https://eolic-api.herokuapp.com/api/aerogerador';

    getAerogeradores() {
        return this.http.get<Aerogerador[]>(this.baseUrl);
    }

    getAerogeradorById(id: number) {
        return this.http.get<Aerogerador>(this.baseUrl + '/' + id);
    }

    createAerogerador(aerogerador: Aerogerador) {
        return this.http.post(this.baseUrl, aerogerador);
    }

    updateAerogerador(aerogerador: Aerogerador) {
        return this.http.put(this.baseUrl + '/' + aerogerador.id, aerogerador);
    }

    deleteAerogerador(id: number) {
        return this.http.delete(this.baseUrl + '/' + id);
    }  
}
