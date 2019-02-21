import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { ComplexoEolicoComponent } from './/complexo-eolico/complexo-eolico.component'
import { ParqueEolicoComponent } from './parque-eolico/parque-eolico.component'
import {MensagemUtil} from '../../../core/util/mensagem.util';
import {AuthenticationService} from '../../../core/http/authentication.service';
import {ComplexoEolico} from '../../../core/modelos/complexo-eolico.model.';
import {Aerogerador} from '../../../core/modelos/aerogerador.model';
import {AerogeradorComponent} from './aerogerador/aerogerador.component';
import {ParqueEolico} from '../../../core/modelos/parque-eolico.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  hasComplexo : boolean;
  hasParque : boolean;
  hasAerogerador : boolean;
  complexosEolicos: Array<ComplexoEolico> = [];
  parquesEolicos: Array<ParqueEolico> = [];

  constructor(
  ) { }

  hasComplexosEolicos(event){
    event.length > 0 ? this.complexosEolicos = event : this.complexosEolicos = [];
  }
  hasParquesEolicos(event){
    event.length > 0 ? this.parquesEolicos = event : this.parquesEolicos = [];
  }
  ngOnInit(): void {
  }

}
