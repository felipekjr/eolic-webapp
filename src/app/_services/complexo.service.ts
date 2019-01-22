import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Complexo } from '../_models/complexo'

@Injectable({
  providedIn: 'root'
})
export class ComplexoService {

  constructor(private http: HttpClient) { }
  baseUrl: string = 'https://eolic-api.herokuapp.com/api/complexo_eolico';

    getComplexos() {
        return this.http.get<Complexo[]>(this.baseUrl);
    }

    getComplexoById(id: number) {
        return this.http.get<Complexo>(this.baseUrl + '/' + id);
    }

    createComplexo(complexo: Complexo) {
        return this.http.post(this.baseUrl, complexo);
    }

    updateComplexo(complexo: Complexo) {
        return this.http.put(this.baseUrl + '/' + complexo.id, complexo);
    }

    deleteComplexo(id: number) {
        return this.http.delete(this.baseUrl + '/' + id);
    }  
}
