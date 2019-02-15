import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';

import { ComplexoEolicoService } from '../../../_services/complexo-eolico.service'
import { ComplexoEolico } from '../../../_models/complexo-eolico.model.'

@Component({
  selector: 'app-complexo-form',
  templateUrl: './complexo-form.component.html',
  styleUrls: ['./complexo-form.component.scss']
})
export class ComplexoFormComponent implements OnChanges {

  @Input() complexo;
  @Input() operation;
  complexos: ComplexoEolico[];
  complexoForm: FormGroup;
  isUpdate: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private complexoService: ComplexoEolicoService
  ) { }


  onSubmit(): void {
    //cadastro
    if (!this.isUpdate) {      
      this.complexoService.salvar(this.complexoForm.value)
        .subscribe(data => {
          window.alert("COMPLEXO CADASTRADO COM SUCESSO!")
          location.reload();
        })
      //update  
    } else {
      this.complexoForm.value.id = this.complexo.id
      this.complexoService.editar(this.complexoForm.value)
        .subscribe(data => {
          window.alert("COMPLEXO ATUALIZADO COM SUCESSO!")
          location.reload();
        })
    }
  }

  ngOnChanges(change: SimpleChanges) {
    if (this.operation) {
      this.isUpdate = true
      this.complexoForm = this.formBuilder.group({
        nome: [this.complexo.nome, Validators.required],
        uf: [this.complexo.uf],
        identificador: [this.complexo.identificador]
      })
    } else {
      this.isUpdate = false
      this.complexoForm = this.formBuilder.group({
        nome: ['', Validators.required],
        uf: ['',],
        identificador: ['',]
      })
    }
  }

  ngOnInit() {
    this.complexoForm = this.formBuilder.group({
      nome: ['', Validators.required],
      uf: ['',],
      identificador: ['',]
    })
  }

}
