import { Component, OnInit, ViewChild } from '@angular/core';
import { ComplexoEolicoComponent } from './/complexo-eolico/complexo-eolico.component'
import { ParqueEolicoComponent } from './parque-eolico/parque-eolico.component'
import {MensagemUtil} from '../../../core/util/mensagem.util';
import {AuthenticationService} from '../../../core/http/authentication.service';

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

  constructor(
    private mensagemUtil : MensagemUtil,
    private authenticationService : AuthenticationService
  ) { }

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
   
  }
  parqueDeleted(event){
    this.complexo.parqueDeletedConfirmed = true;
  }
  ngOnInit() {
    setTimeout(
      () => this.mensagemUtil.adicionarMesagemBemVindo("Bem vindo " + `${this.authenticationService.usuarioLogado.login}` + "!"),
      500
    )
  }
}
