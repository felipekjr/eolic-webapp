import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ParqueService } from '../../_services/parque.service'
import { AerogeradorService } from '../../_services/aerogerador.service'
import { Parque } from '../../_models/parque'
import { Aerogerador } from '../../_models/aerogerador';
import { cleanSession } from 'selenium-webdriver/safari';

@Component({
  selector: 'app-parque-eolico',
  templateUrl: './parque-eolico.component.html',
  styleUrls: ['./parque-eolico.component.scss']
})
export class ParqueEolicoComponent implements OnInit {
  parques: Parque[];
  aerogeradores = [];
  @Input() hasComplexo: boolean;
  @Output() hasParque = new EventEmitter<boolean>();
  @Output() parqueIsDeleted = new EventEmitter<boolean>();
  isUpdate: boolean;
  parqueForUpdate: Parque
  parqueForDelete: Parque;

  constructor(
    private parqueService: ParqueService,
    private aerogeradorService: AerogeradorService
  ) { }


  updateParque(parque: Parque) {
    if (parque) {
      this.parqueForUpdate = parque;
      this.isUpdate = true;
    } else {
      this.parqueForUpdate = new Parque
      this.isUpdate = false;
    }
  }

  //helper function delay
  delay = ms => new Promise(res => setTimeout(res, ms));
  async deleteParque(parque: Parque, fromComplexo: boolean) {
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

  deleteAerogeradores(parque: Parque) {
    this.aerogeradores.forEach(aerogerador => {
      if (aerogerador.parqueEolico.id == parque.id) {
        this.aerogeradorService.deleteAerogerador(aerogerador.id).subscribe()
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
