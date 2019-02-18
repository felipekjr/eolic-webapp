import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { AerogeradorService } from '../../../../core/crud/aerogerador.service'
import { Aerogerador  } from '../../../../core/modelos/aerogerador.model'

@Component({
  selector: 'app-aerogerador',
  templateUrl: './aerogerador.component.html',
  styleUrls: ['./aerogerador.component.scss']
})
export class AerogeradorComponent implements OnInit {
  aerogeradores: Aerogerador[];
  aerogeradorForUpdate: Aerogerador;
  isUpdate: boolean
  @Input() hasParque: boolean;
  @Output() hasAerogerador = new EventEmitter<boolean>();
  constructor(private aerogeradorService: AerogeradorService) { }

  //editar e criar
  updateAerogerador(aerogerador: Aerogerador) {
    if (aerogerador) {
      this.aerogeradorForUpdate = aerogerador;
      this.isUpdate = true;
    } else {
      this.aerogeradorForUpdate = new Aerogerador()
      this.isUpdate = false;
    }
  }

  deleteAerogerador(aerogerador: Aerogerador) {
    this.aerogeradorService.deletar(aerogerador.id)
      .subscribe(data => {
        this.aerogeradorService.todos()
          .subscribe(data => {
            this.aerogeradores = data;
          });
      })
    location.reload()
  }

  ngOnInit() {
    this.aerogeradorService.todos()
      .subscribe(data => {
        this.aerogeradores = data;
        if (this.aerogeradores) {
          if (this.aerogeradores.length == 0) {
            this.hasAerogerador.emit(false)
          }
          else {
            this.hasAerogerador.emit(true)
          }
        }
      });
  }
}



