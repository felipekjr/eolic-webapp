import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  TemplateRef,
  ChangeDetectorRef,
  Output,
  HostBinding
} from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';

import { ParqueEolicoService } from '../../../../../core/crud/parque-eolico.service'
import { ParqueEolico } from '../../../../../core/modelos/parque-eolico.model'
import {ParqueEolicoSharedService} from '../../../../../core/services/parque-eolico-shared.service';
import {ModalFormContentComponent} from '../../../../../shared/content/modal-form-content';
import {Estados} from '../../../../../core/util/estados.util';
import {ComplexoEolico} from '../../../../../core/modelos/complexo-eolico.model.';
import {ComplexoEolicoService} from '../../../../../core/crud/complexo-eolico.service';
import {MensagemUtil} from '../../../../../core/util/mensagem.util';
import {ComplexoEolicoSharedService} from '../../../../../core/services/complexo-eolico-shared.service';

@Component({
  selector: 'app-parque-form',
  templateUrl: './parque-form.component.html',
  styleUrls: ['./parque-form.component.scss']
})
export class ParqueFormComponent extends ModalFormContentComponent implements OnInit{
  @ViewChild('modalParqueEolico') modalParqueEolico: TemplateRef<any>;
  @ViewChild('form') form: any;
  @Input() parqueEolico: ParqueEolico;
  @Input() complexosEolicos: Array<ComplexoEolico> = [];
  @Input() isUpdate;
  estados: Array<any> = Estados;

  constructor(
    private _parqueEolicoSharedService: ParqueEolicoSharedService,
    protected changeDetection: ChangeDetectorRef,
    private complexoEolicoSharedService : ComplexoEolicoSharedService,
    private mensagemUtil: MensagemUtil
  ) {
    super(changeDetection);
  }

  abrirModal() {
    this.openModal(this.modalParqueEolico);
  }
  fecharModal() {
    this.closeModal(this.modalParqueEolico)
  }
  compareInSelect(c1, c2): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  persistirEntidade(form) {
    if (form.invalid) {
      return;
    } else {
      this._parqueEolicoSharedService.emitChange(this.parqueEolico);
      this.closeModal(this.modalParqueEolico);
    }
  }

  executeAfterModalHide() {
    this.parqueEolico = new ParqueEolico();
    this.form.submitted = false;
  }

  ngOnInit() {
    this.parqueEolico = new ParqueEolico();
    this.form.submitted = false;
    this.complexosEolicos = new Array<ComplexoEolico>()
    Validators.pattern(".*\\S.*[a-zA-z0-9 ]")
  }



}

