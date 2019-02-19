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
export class ComplexoFormComponent extends ModalFormContentComponent implements OnChanges{

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

  ngOnChanges(change: SimpleChanges) {

  }

}


// @Input() complexo;
// @Input() operation;
// complexos: ComplexoEolico[];
// complexoForm: FormGroup;
// isUpdate: boolean = false;
//
// constructor(
//   private formBuilder: FormBuilder,
//   private complexoEolicoShared: ComplexoEolicoService,
//   private complexoEolicoSharedService : ComplexoEolicoSharedService
// ) { }
//
//
// onSubmit(): void {
//   //cadastro
//   if (!this.isUpdate) {
//     this.complexoEolicoSharedService.emitChange(this.complexoForm.value);
//     // this.complexoEolicoShared.salvar(this.complexoForm.value)
//     //   .subscribe(data => {
//     //     window.alert("COMPLEXO CADASTRADO COM SUCESSO!")
//     //
//     //   })
//     //update
//   } else {
//     this.complexoForm.value.id = this.complexo.id
//     this.complexoEolicoShared.editar(this.complexoForm.value)
//       .subscribe(data => {
//         window.alert("COMPLEXO ATUALIZADO COM SUCESSO!")
//         location.reload();
//       })
//   }
// }
//
// ngOnChanges(change: SimpleChanges) {
//   if (this.operation) {
//     this.isUpdate = true
//     this.complexoForm = this.formBuilder.group({
//       nome: [this.complexo.nome, Validators.required],
//       uf: [this.complexo.uf],
//       identificador: [this.complexo.identificador]
//     })
//   } else {
//     this.isUpdate = false
//     this.complexoForm = this.formBuilder.group({
//       nome: ['', Validators.required],
//       uf: ['',],
//       identificador: ['',]
//     })
//   }
// }
//
// ngOnInit() {
//   this.complexoForm = this.formBuilder.group({
//     nome: ['', Validators.required],
//     uf: ['',],
//     identificador: ['',]
//   })
// }
