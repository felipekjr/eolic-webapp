import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ComplexoEolicoService } from '../../_services/complexo-eolico.service'
import { ParqueEolicoService } from '../../_services/parque-eolico.service'

import { ComplexoEolico } from '../../_models/complexo-eolico.model.'

@Component({
  selector: 'app-complexo-eolico',
  templateUrl: './complexo-eolico.component.html',
  styleUrls: ['./complexo-eolico.component.scss']
})
export class ComplexoEolicoComponent implements OnInit {
  complexos: ComplexoEolico[];
  parques = [];
  aerogeradores = [];
  isUpdate: boolean;
  complexoForUpdate: ComplexoEolico;
  @Output() hasComplexo = new EventEmitter<boolean>();
  @Output() parqueForDelete = new EventEmitter();
  parqueDeletedConfirmed: boolean

  constructor(
    private complexoService: ComplexoEolicoService,
    private parqueService: ParqueEolicoService
  ) { }

  updateComplexo(complexo: ComplexoEolico) {
    if (complexo) {
      this.complexoForUpdate = complexo;
      this.isUpdate = true;
    } else {
      this.complexoForUpdate = new ComplexoEolico()
      this.isUpdate = false;
    }
  }

  //help function delay
  delay = ms => new Promise(res => setTimeout(res, ms));
  async deleteComplexo(complexo: ComplexoEolico) {
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

  deleteParquesRequest(complexo: ComplexoEolico) {
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
