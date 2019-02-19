import {Component, OnInit, Output, EventEmitter, SimpleChanges, OnChanges, ViewChild} from '@angular/core';

import { ComplexoEolicoService } from '../../../../core/crud/complexo-eolico.service'
import { ParqueEolicoService } from '../../../../core/crud/parque-eolico.service'

import { ComplexoEolico } from '../../../../core/modelos/complexo-eolico.model.'
import {ComplexoEolicoSharedService} from '../../../../core/services/complexo-eolico-shared.service';
import {Subscription} from 'rxjs';
import {ParqueEolico} from '../../../../core/modelos/parque-eolico.model';
import {MensagemUtil} from '../../../../core/util/mensagem.util';

@Component({
  selector: 'app-complexo-eolico',
  templateUrl: './complexo-eolico.component.html',
  styleUrls: ['./complexo-eolico.component.scss']
})
export class ComplexoEolicoComponent implements OnInit {
  @Output() hasComplexo = new EventEmitter<boolean>();
  @Output() parqueForDelete = new EventEmitter();
  parqueDeletedConfirmed: boolean


  @ViewChild('modalComplexoEolico') modalComplexoEolico: any;
  @ViewChild('modalParqueEolico') modalParqueEolico: any;
  @ViewChild('form') form: any;

  private complexoEolicoSharedServiceSubscription: any;
  private idComplexoEolico: number;

  isUpdate: boolean;
  parqueEolico: ParqueEolico = new ParqueEolico();
  complexoEolico: ComplexoEolico = new ComplexoEolico();
  complexosEolicos: Array<ComplexoEolico> = [];



  constructor(
    private complexoEolicoService: ComplexoEolicoService,
    private parqueService: ParqueEolicoService,
    private complexoEolicoSharedService : ComplexoEolicoSharedService,
    private mensagemUtil : MensagemUtil
  ) {
    }

  ngOnInit() {
    this.complexosEolicos = [];
    this.buscarComplexosEolicos();
    this.complexoEolicoSharedServiceSubscription = this.complexoEolicoService.getChangeEmittedComplexoEolico()
      .subscribe(complexoEolicoRecebido => {
        if (complexoEolicoRecebido) {
          this.persistirEntidade(complexoEolicoRecebido);
        }
      });
  }

  callbackBotaoEditarComplexo(complexoId: any) {
    if(complexoId){
      this.isUpdate = true;
      this.complexoEolicoService.buscarPorId(complexoId).subscribe(complexoEolico => {
        this.complexoEolico = complexoEolico;
        this.modalComplexoEolico.abrirModal();
      }, erro => {
        this.mensagemUtil.adicionarMensagensDeErro('geral.complexo_eolico', erro);
      });
    }else{
      this.isUpdate = false;
      this.complexoEolico = new ComplexoEolico();
      this.modalComplexoEolico.abrirModal();
    }
  }

  callbackBotaoDeletarComplexo(event: any) {
    const thisComponent = this;
    const nomeComplexoEolico = this.complexosEolicos.find(complexoEolico => complexoEolico.id === event).nome;
    const complexoEolicoIndex: number = thisComponent.complexosEolicos.findIndex(
          complexoEolico => complexoEolico.id === event);
    thisComponent.complexoEolicoService.deletar(event).subscribe(() => {
      thisComponent.complexosEolicos.splice(complexoEolicoIndex, 1);
      thisComponent.atualizarLista();
      }, erro => {
          thisComponent.mensagemUtil.adicionarMensagensDeErro('geral.complexo_eolico', erro);
        })
  }


  private salvarEntidadeComplexoEolico(complexoEolicoRecebido: ComplexoEolico) {
    this.complexoEolicoService.salvar(complexoEolicoRecebido).subscribe(complexoEolico => {
      this.complexosEolicos.push(complexoEolico);
      this.atualizarLista();
    }, erro => {
      this.mensagemUtil.adicionarMensagensDeErro('geral.complexo_eolico', erro);
    });
  }

  private editarEntidadeComplexoEolico(complexoEolicoRecebido: ComplexoEolico) {
    this.complexoEolicoService.editar(complexoEolicoRecebido).subscribe(complexoEolicoCadastrado => {
      const complexoEolicoIndex: number = this.complexosEolicos.findIndex(
        complexoEolico => complexoEolico.id === complexoEolicoRecebido.id);
      this.complexosEolicos[complexoEolicoIndex] = complexoEolicoCadastrado;
      this.atualizarLista();
    }, erro => {
      this.mensagemUtil.adicionarMensagensDeErro('geral.complexo_eolico', erro);
    });
  }

  persistirEntidade(complexoEolicoRecebido: ComplexoEolico) {
    if (complexoEolicoRecebido.id) {
      this.editarEntidadeComplexoEolico(complexoEolicoRecebido);
    } else {
      this.salvarEntidadeComplexoEolico(complexoEolicoRecebido);
    }
  }

  private buscarComplexosEolicos() {
    this.complexoEolicoService.todos().subscribe(complexosEolicos => {
      this.complexosEolicos = complexosEolicos;
      this.atualizarLista();
    }, erro => {
      this.mensagemUtil.adicionarMensagensDeErro('geral.complexo_eolico', erro);
    });
  }

  private atualizarLista(){
  }

  ngOnDestroy(): void {
    if (this.complexoEolicoSharedServiceSubscription) {
      this.complexoEolicoSharedServiceSubscription.unsubscribe();
    }
  }



}
