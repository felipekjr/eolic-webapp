import {Component, OnInit, Output, EventEmitter, SimpleChanges, OnChanges, ViewChild, Input} from '@angular/core';

import { ParqueEolicoService } from '../../../../core/crud/parque-eolico.service'
import {ParqueEolicoSharedService} from '../../../../core/services/parque-eolico-shared.service';
import {Subscription} from 'rxjs';
import {ParqueEolico} from '../../../../core/modelos/parque-eolico.model';
import {MensagemUtil} from '../../../../core/util/mensagem.util';
import {ComplexoEolico} from '../../../../core/modelos/complexo-eolico.model.';

@Component({
  selector: 'app-parque-eolico',
  templateUrl: './parque-eolico.component.html',
  styleUrls: ['./parque-eolico.component.scss']
})
export class ParqueEolicoComponent implements OnInit, OnChanges {
  @ViewChild('modalParqueEolico') modalParqueEolico: any;
  @ViewChild('form') form: any;
  @Input() complexosEolicos: Array<ComplexoEolico>;
  @Output() parquesOutput = new EventEmitter<Array<ParqueEolico>>();
  private parqueEolicoSharedServiceSubscription: any;
  private idparqueEolico: number;
  isUpdate: boolean;
  parqueEolico: ParqueEolico = new ParqueEolico();
  parquesEolicos: Array<ParqueEolico> = [];


  constructor(
    private parqueEolicoService: ParqueEolicoService,    
    private parqueEolicoSharedService : ParqueEolicoSharedService,
    private mensagemUtil : MensagemUtil
  ) {
    }

  ngOnInit() {
    this.parquesEolicos = [];
    this.buscarparquesEolicos();
    this.parqueEolicoSharedServiceSubscription = this.parqueEolicoService.getChangeEmittedParqueEolico()
      .subscribe(parqueEolicoRecebido => {
        if (parqueEolicoRecebido) {
          this.persistirEntidade(parqueEolicoRecebido);
        }
      });

  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.complexosEolicos)
  }

  callbackBotaoEditarparque(parqueId: any) {
    if(parqueId){
      this.isUpdate = true;
      this.parqueEolicoService.buscarPorId(parqueId).subscribe(parqueEolico => {
        this.parqueEolico = parqueEolico;
        this.modalParqueEolico.abrirModal();
      }, erro => {
        this.mensagemUtil.adicionarMensagensDeErro('geral.parque_eolico', erro);
      });
    }else{    
      this.isUpdate = false;
      this.parqueEolico = new ParqueEolico();
      this.modalParqueEolico.abrirModal();
    }
  }

  callbackBotaoDeletarparque(event: any) {
    const thisComponent = this;
    const nomeparqueEolico = this.parquesEolicos.find(parqueEolico => parqueEolico.id === event).nome;
    const parqueEolicoIndex: number = thisComponent.parquesEolicos.findIndex(
          parqueEolico => parqueEolico.id === event);
    thisComponent.parqueEolicoService.deletar(event).subscribe(() => {
      thisComponent.parquesEolicos.splice(parqueEolicoIndex, 1);    
      thisComponent.mensagemUtil.adicionarMesagemSucesso('geral.parque_eolico');  
      }, erro => {
          thisComponent.mensagemUtil.adicionarMensagensDeErro('geral.parque_eolico', erro);
        })
  }

  persistirEntidade(parqueEolicoRecebido: ParqueEolico) {
    if (parqueEolicoRecebido.id) {
      this.editarEntidadeparqueEolico(parqueEolicoRecebido);
    } else {
      this.salvarEntidadeparqueEolico(parqueEolicoRecebido);
    }
  }
 
  private editarEntidadeparqueEolico(parqueEolicoRecebido: ParqueEolico) {
    this.parqueEolicoService.editar(parqueEolicoRecebido).subscribe(parqueEolicoCadastrado => {
      const parqueEolicoIndex: number = this.parquesEolicos.findIndex(
        parqueEolico => parqueEolico.id === parqueEolicoRecebido.id);      
      this.parquesEolicos[parqueEolicoIndex] = parqueEolicoCadastrado;     
    }, erro => {
      this.mensagemUtil.adicionarMensagensDeErro('geral.parque_eolico', erro);
    });
  }

  private salvarEntidadeparqueEolico(parqueEolicoRecebido: ParqueEolico) {
    console.table(parqueEolicoRecebido)
    this.parqueEolicoService.salvar(parqueEolicoRecebido).subscribe(parqueEolico => {
      this.parquesEolicos.push(parqueEolico);
      this.parquesOutput.emit(this.parquesEolicos)
    }, erro => {
      this.mensagemUtil.adicionarMensagensDeErro('geral.parque_eolico', erro);
    });
  }
  

  private buscarparquesEolicos() {
    this.parqueEolicoService.todos().subscribe(parquesEolicos => {
      this.parquesEolicos = parquesEolicos;
      this.parquesOutput.emit(this.parquesEolicos)
    }, erro => {
      this.mensagemUtil.adicionarMensagensDeErro('geral.parque_eolico', erro);
    });
  }
  

  ngOnDestroy(): void {
    if (this.parqueEolicoSharedServiceSubscription) {
      this.parqueEolicoSharedServiceSubscription.unsubscribe();
    }
  }



}




  // parques: ParqueEolico[];
  // aerogeradores = [];
  // @Input() hasparque: boolean;
  // @Output() hasParque = new EventEmitter<boolean>();
  // @Output() parqueIsDeleted = new EventEmitter<boolean>();
  // isUpdate: boolean;
  // parqueForUpdate: ParqueEolico
  // parqueForDelete: ParqueEolico;

 
