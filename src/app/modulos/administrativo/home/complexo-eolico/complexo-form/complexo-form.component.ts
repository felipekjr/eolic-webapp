import {Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, TemplateRef, ChangeDetectorRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';

import { ComplexoEolicoService } from '../../../../../core/crud/complexo-eolico.service'
import { ComplexoEolico } from '../../../../../core/modelos/complexo-eolico.model.'
import {ComplexoEolicoSharedService} from '../../../../../core/services/complexo-eolico-shared.service';
import {ModalFormContentComponent} from '../../../../../shared/content/modal-form-content';
import {Estados} from '../../../../../core/util/estados.util';

@Component({
  selector: 'app-complexo-form',
  templateUrl: './complexo-form.component.html',
  styleUrls: ['./complexo-form.component.scss']
})
export class ComplexoFormComponent extends ModalFormContentComponent implements OnInit{

  @ViewChild('modalComplexoEolico') modalComplexoEolico: TemplateRef<any>;
  @ViewChild('form') form: any;
  @Input() complexoEolico: ComplexoEolico;
  @Input() isUpdate = false;

  estados: Array<any> = Estados;

  constructor(
    private _complexoEolicoSharedService: ComplexoEolicoSharedService,
    protected changeDetection: ChangeDetectorRef
  ) {
    super(changeDetection);
  }

  abrirModal() {
    this.openModal(this.modalComplexoEolico);
  }
  fecharModal() {
    this.closeModal(this.modalComplexoEolico)
  }

  persistirEntidade(form) {
    if (form.invalid || !this.complexoEolico.uf) {
      return;
    } else {
      this._complexoEolicoSharedService.emitChange(this.complexoEolico);
      this.closeModal(this.modalComplexoEolico);
    }
  }

  executeAfterModalHide() {
    this.complexoEolico = new ComplexoEolico();
    this.form.submitted = false;
  }

  ngOnInit() {
    this.complexoEolico = new ComplexoEolico();
    this.form.submitted = false;
    Validators.pattern(".*\\S.*[a-zA-z0-9 ]")
  }

}

