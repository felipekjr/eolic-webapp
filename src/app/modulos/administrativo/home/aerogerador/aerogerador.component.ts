import {Component, OnInit, Output, EventEmitter, SimpleChanges, OnChanges, ViewChild, Input} from '@angular/core';

import { AerogeradorService } from '../../../../core/crud/aerogerador.service'
import { ParqueEolicoService } from '../../../../core/crud/parque-eolico.service'

import { Aerogerador } from '../../../../core/modelos/aerogerador.model'
import {AerogeradorSharedService} from '../../../../core/services/aerogerador-shared.service';
import {Subscription} from 'rxjs';
import {ParqueEolico} from '../../../../core/modelos/parque-eolico.model';
import {MensagemUtil} from '../../../../core/util/mensagem.util';
import {ComplexoEolico} from '../../../../core/modelos/complexo-eolico.model.';

@Component({
  selector: 'app-aerogerador',
  templateUrl: './aerogerador.component.html',
  styleUrls: ['./aerogerador.component.scss']
})
export class AerogeradorComponent implements OnInit {
  @ViewChild('modalAerogerador') modalAerogerador: any;
  @ViewChild('form') form: any;
  @Input() parquesEolicos: Array<ParqueEolico>;
  private aerogeradorSharedServiceSubscription: any;
  private idAerogerador: number;

  isUpdate: boolean;
  parqueEolico: ParqueEolico = new ParqueEolico();
  aerogerador: Aerogerador = new Aerogerador();
  aerogeradores: Array<Aerogerador> = [];

  constructor(
    private aerogeradorService: AerogeradorService,
    private parqueService: ParqueEolicoService,
    private aerogeradorSharedService : AerogeradorSharedService,
    private mensagemUtil : MensagemUtil
  ) {
  }

  ngOnInit() {
    this.aerogeradores = [];
    this.buscarAerogeradores();
    this.aerogeradorSharedServiceSubscription = this.aerogeradorService.getChangeEmittedAerogerador()
      .subscribe(aerogeradorRecebido => {
        if (aerogeradorRecebido) {
          this.persistirEntidade(aerogeradorRecebido);
        }
      });
  }

  callbackBotaoEditarComplexo(complexoId: any) {
    if(complexoId){
      this.isUpdate = true;
      this.aerogeradorService.buscarPorId(complexoId).subscribe(aerogerador => {
        this.aerogerador = aerogerador;
        this.modalAerogerador.abrirModal();
      }, erro => {
        this.mensagemUtil.adicionarMensagensDeErro('geral.aerogerador', erro);
      });
    }else{
      this.isUpdate = false;
      this.aerogerador = new Aerogerador();
      this.modalAerogerador.abrirModal();
    }
  }

  callbackBotaoDeletarComplexo(event: any) {
    const thisComponent = this;
    const nomeAerogerador = this.aerogeradores.find(aerogerador => aerogerador.id === event).nome;
    const aerogeradorIndex: number = thisComponent.aerogeradores.findIndex(
      aerogerador => aerogerador.id === event);
    thisComponent.aerogeradorService.deletar(event).subscribe(() => {
      thisComponent.aerogeradores.splice(aerogeradorIndex, 1);
      thisComponent.mensagemUtil.adicionarMesagemSucesso('geral.aerogerador');
    }, erro => {
      thisComponent.mensagemUtil.adicionarMensagensDeErro('geral.aerogerador', erro);
    })
  }

  persistirEntidade(aerogeradorRecebido: Aerogerador) {
    if (aerogeradorRecebido.id) {
      this.editarEntidadeAerogerador(aerogeradorRecebido);
    } else {
      this.salvarEntidadeAerogerador(aerogeradorRecebido);
    }
  }

  private editarEntidadeAerogerador(aerogeradorRecebido: Aerogerador) {
    console.log(aerogeradorRecebido)
    this.aerogeradorService.editar(aerogeradorRecebido).subscribe(aerogeradorCadastrado => {
      const aerogeradorIndex: number = this.aerogeradores.findIndex(
        aerogerador => aerogerador.id === aerogeradorRecebido.id);
      this.aerogeradores[aerogeradorIndex] = aerogeradorCadastrado;
    }, erro => {
      this.mensagemUtil.adicionarMensagensDeErro('geral.aerogerador', erro);
    });
  }

  private salvarEntidadeAerogerador(aerogeradorRecebido: Aerogerador) {
    this.aerogeradorService.salvar(aerogeradorRecebido).subscribe(aerogerador => {
      this.aerogeradores.push(aerogerador);
    }, erro => {
      this.mensagemUtil.adicionarMensagensDeErro('geral.aerogerador', erro);
    });
  }


  private buscarAerogeradores() {
    this.aerogeradorService.todos().subscribe(aerogeradores => {
      this.aerogeradores = aerogeradores;
    }, erro => {
      this.mensagemUtil.adicionarMensagensDeErro('geral.aerogerador', erro);
    });
  }


  ngOnDestroy(): void {
    if (this.aerogeradorSharedServiceSubscription) {
      this.aerogeradorSharedServiceSubscription.unsubscribe();
    }
  }



}
