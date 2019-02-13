import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ParqueEolicoService } from '../../_services/parque-eolico.service'
import { AerogeradorService } from '../../_services/aerogerador.service'
import { ParqueEolico } from '../../_models/parque-eolico.model'
import { Aerogerador } from '../../_models/aerogerador.model';
import { cleanSession } from 'selenium-webdriver/safari';

@Component({
  selector: 'app-parque-eolico',
  templateUrl: './parque-eolico.component.html',
  styleUrls: ['./parque-eolico.component.scss']
})
export class ParqueEolicoComponent implements OnInit {
  parques: ParqueEolico[];
  aerogeradores = [];
  @Input() hasComplexo: boolean;
  @Output() hasParque = new EventEmitter<boolean>();
  @Output() parqueIsDeleted = new EventEmitter<boolean>();
  isUpdate: boolean;
  parqueForUpdate: ParqueEolico
  parqueForDelete: ParqueEolico;

  constructor(
    private parqueService: ParqueEolicoService,
    private aerogeradorService: AerogeradorService
  ) { }


  updateParque(parque: ParqueEolico) {
    if (parque) {
      this.parqueForUpdate = parque;
      this.isUpdate = true;
    } else {
      this.parqueForUpdate = new ParqueEolico
      this.isUpdate = false;
    }
  }

  //helper function delay
  delay = ms => new Promise(res => setTimeout(res, ms));
  async deleteParque(parque: ParqueEolico, fromComplexo: boolean) {
    try {
      await this.deleteAerogeradores(parque)
      await this.delay(500);
      this.parqueService.deleteParque(parque.id).subscribe();

      if (fromComplexo) {
        this.parqueIsDeleted.emit(true);
      } else {
        location.reload()
      }
    } catch{
      console.log("Erro");
    }
  }

  deleteAerogeradores(parque: ParqueEolico) {
    this.aerogeradores.forEach(aerogerador => {
      if (aerogerador.parqueEolico.id == parque.id) {
        this.aerogeradorService.deleteAerogerador(aerogerador.id).subscribe();
      }
    })
  }

  ngOnInit() {
    this.parqueService.getParques()
      .subscribe(data => {
        if (data) {
          if (data.length != 0) {
            this.parques = data;
            this.hasParque.emit(true);
          }
          else {            
            this.hasParque.emit(false);
          }
        }else{         
          this.hasParque.emit(false);
        }
      });
    this.aerogeradorService.getAerogeradores()
      .subscribe(data => {
        this.aerogeradores = data
      });
  }

}
