import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';

import { ParqueEolicoService } from '../../../_services/parque-eolico.service'
import { ComplexoEolicoService } from '../../../_services/complexo-eolico.service'
import { ParqueEolico } from '../../../_models/parque-eolico.model'
import { ComplexoEolico } from '../../../_models/complexo-eolico.model.'

@Component({
  selector: 'app-parque-form',
  templateUrl: './parque-form.component.html',
  styleUrls: ['./parque-form.component.scss']
})
export class ParqueFormComponent implements OnChanges {

  @Input() parque;
  @Input() operation;
  parques: ParqueEolico[];
  complexos: ComplexoEolico[];
  complexo: ComplexoEolico;
  parqueForm: FormGroup;
  isUpdate: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private parqueService: ParqueEolicoService,
    private complexoService: ComplexoEolicoService
  ) { }


  onSubmit(): void {
    //cadastro
    if (!this.isUpdate) {      
      this.parqueService.salvar(this.parqueForm.value)
        .subscribe(data => {
          window.alert("PARQUE CADASTRADO COM SUCESSO!")
          location.reload();
        })
      //update  
    } else {
      console.log(this.parqueForm.value)
      this.parqueForm.value.id = this.parque.id
      this.parqueService.editar(this.parqueForm.value)
        .subscribe(data => {
          window.alert("PARQUE ATUALIZADO COM SUCESSO!")
          location.reload();
        })
    }
  }

  ngOnChanges(change: SimpleChanges) {
    if (this.operation) {
      this.isUpdate = true
      this.parqueForm = this.formBuilder.group({
        nome: [this.parque.nome, Validators.required],
        latitude: [this.parque.latitude],
        longitude: [this.parque.longitude],
        potencia_instalada: [this.parque.potencia_instalada],
        complexoEolico: [this.parque.complexoEolico, Validators.required]
      })
    } else {
      this.isUpdate = false
      this.parqueForm = this.formBuilder.group({
        nome: ['', Validators.required],
        latitude: [''],
        longitude: [''],
        potencia_instalada: [''],
        complexoEolico: ['', Validators.required],
      })
    }
  }

  ngOnInit() {
    this.complexoService.todos()
      .subscribe(data => {
        this.complexos = data;
      })
    this.parqueForm = this.formBuilder.group({
      nome: ['', Validators.required],
      latitude: [''],
      longitude: [''],
      potencia_instalada: [''],
      complexoEolico: ['', Validators.required],
    })
  }

}
