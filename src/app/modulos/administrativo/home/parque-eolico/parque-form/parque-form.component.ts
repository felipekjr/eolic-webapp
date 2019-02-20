import {Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, TemplateRef, ChangeDetectorRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';

import { ParqueEolicoService } from '../../../../../core/crud/parque-eolico.service'
import { ParqueEolico } from '../../../../../core/modelos/parque-eolico.model'
import {ParqueEolicoSharedService} from '../../../../../core/services/parque-eolico-shared.service';
import {ModalFormContentComponent} from '../../../../../shared/content/modal-form-content';
import {Estados} from '../../../../../core/util/estados.util';

@Component({
  selector: 'app-parque-form',
  templateUrl: './parque-form.component.html',
  styleUrls: ['./parque-form.component.scss']
})
export class ParqueFormComponent extends ModalFormContentComponent implements OnChanges{

  @ViewChild('modalParqueEolico') modalParqueEolico: TemplateRef<any>;
  @ViewChild('form') form: any;
  @Input() parqueEolico: ParqueEolico;
  @Input() isUpdate = false;

  estados: Array<any> = Estados;

  constructor(
    private _parqueEolicoSharedService: ParqueEolicoSharedService,
    protected changeDetection: ChangeDetectorRef
  ) {
    super(changeDetection);
  }

  abrirModal() {
    this.openModal(this.modalParqueEolico);
  }
  fecharModal() {
    this.closeModal(this.modalParqueEolico)
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

  ngOnChanges(changes: SimpleChanges) {   
   
  }

}

