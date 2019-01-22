import { Component, OnInit, ViewChild } from '@angular/core';
import { ComplexoEolicoComponent } from '../home/complexo-eolico/complexo-eolico.component'
import { ParqueEolicoComponent } from '../home/parque-eolico/parque-eolico.component'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  hasComplexo : boolean;
  hasParque : boolean;
  hasAerogerador : boolean;
  @ViewChild(ParqueEolicoComponent) parque: ParqueEolicoComponent;
  @ViewChild(ComplexoEolicoComponent) complexo: ComplexoEolicoComponent;
  constructor() { }

  onMatchComplexo(event : boolean){   
    event ? this.hasComplexo = true : this.hasComplexo = false;
  }
  onMatchParque(event : boolean){    
    event ? this.hasParque = true : this.hasParque = false;    
  }
  onMatchAerogerador(event : boolean){    
    event ? this.hasAerogerador = true : this.hasAerogerador = false;
  }

  deleteParque(parqueForDelete){
    this.parque.deleteParque(parqueForDelete, true)
  }
  parqueDeleted(event){
    this.complexo.parqueDeletedConfirmed = true;
  }
  ngOnInit() {
   
  }

}
