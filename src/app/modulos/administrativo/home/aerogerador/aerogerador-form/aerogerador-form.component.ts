import {Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, TemplateRef, ChangeDetectorRef, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';

import { AerogeradorService } from '../../../../../core/crud/aerogerador.service'
import { Aerogerador } from '../../../../../core/modelos/aerogerador.model'
import {AerogeradorSharedService} from '../../../../../core/services/aerogerador-shared.service';
import {ModalFormContentComponent} from '../../../../../shared/content/modal-form-content';
import {ParqueEolico} from '../../../../../core/modelos/parque-eolico.model';

@Component({
  selector: 'app-aerogerador-form',
  templateUrl: './aerogerador-form.component.html',
  styleUrls: ['./aerogerador-form.component.scss']
})
export class AerogeradorFormComponent extends ModalFormContentComponent implements OnChanges{

  @ViewChild('modalAerogerador') modalAerogerador: TemplateRef<any>;
  @ViewChild('form') form: any;
  @Input() aerogerador: Aerogerador;
  @Input() parquesEolicos: Array<ParqueEolico> = [];
  @Input() isUpdate;

  constructor(
    private _aerogeradorSharedService: AerogeradorSharedService,
    protected changeDetection: ChangeDetectorRef
  ) {
    super(changeDetection);
  }

  abrirModal() {
    this.openModal(this.modalAerogerador);
  }
  fecharModal() {
    this.closeModal(this.modalAerogerador)
  }

  persistirEntidade(form) {
    if (form.invalid) {
      return;
    } else {
      this._aerogeradorSharedService.emitChange(this.aerogerador);
      this.closeModal(this.modalAerogerador);
    }
  }

  executeAfterModalHide() {
    this.aerogerador = new Aerogerador();
    this.form.submitted = false;
  }

  ngOnChanges(changes: SimpleChanges) {
  }

}

