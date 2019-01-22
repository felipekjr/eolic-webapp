import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ComplexoService } from '../../_services/complexo.service'
import { ParqueService } from '../../_services/parque.service'

import { Complexo } from '../../_models/complexo'

@Component({
  selector: 'app-complexo-eolico',
  templateUrl: './complexo-eolico.component.html',
  styleUrls: ['./complexo-eolico.component.scss']
})
export class ComplexoEolicoComponent implements OnInit {
  complexos: Complexo[];
  parques = [];
  aerogeradores = [];
  isUpdate: boolean;
  complexoForUpdate: Complexo;
  @Output() hasComplexo = new EventEmitter<boolean>();
  @Output() parqueForDelete = new EventEmitter();
  parqueDeletedConfirmed: boolean

  constructor(
    private complexoService: ComplexoService,
    private parqueService: ParqueService
  ) { }

  updateComplexo(complexo: Complexo) {
    if (complexo) {
      this.complexoForUpdate = complexo;
      this.isUpdate = true;
    } else {
      this.complexoForUpdate = new Complexo
      this.isUpdate = false;
    }
  }

  //help function delay
  delay = ms => new Promise(res => setTimeout(res, ms));
  async deleteComplexo(complexo: Complexo) {
    if(this.parques.length != 0){
      await this.deleteParquesRequest(complexo)
      await this.delay(500);
      if (this.parqueDeletedConfirmed) {
        console.log("Parques Deletados");
        await this.delay(1000);
        this.complexoService.deleteComplexo(complexo.id).subscribe(data => {
          window.alert("COMPLEXO DELETADO COM SUCESSO!")
          location.reload()
        })
      }
    }else{
      this.complexoService.deleteComplexo(complexo.id).subscribe(data => {
        window.alert("COMPLEXO DELETADO COM SUCESSO!")
        location.reload()
      })
    }
    
  }

  deleteParquesRequest(complexo: Complexo) {
    this.parques.forEach(parque => {
      if (parque.complexoEolico.id == complexo.id) {
        this.parqueForDelete.emit(parque)
      }
    })
  }

  ngOnInit() {
    this.complexoService.getComplexos()
      .subscribe(data => {
        if (data) {          
          if (data.length != 0) {           
            this.complexos = data            
            this.hasComplexo.emit(true);
          }else{      
            this.hasComplexo.emit(false)
          }
        }else{
          this.hasComplexo.emit(false)  
        }        
      });
    this.parqueService.getParques()
      .subscribe(data => {
        this.parques = data;
      });
  }

}
