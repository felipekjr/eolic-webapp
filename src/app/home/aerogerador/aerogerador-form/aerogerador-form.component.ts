import { Component, Input, SimpleChanges, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';

import { Aerogerador } from '../../../_models/aerogerador.model'
import { ParqueEolico } from '../../../_models/parque-eolico.model'
import { AerogeradorService } from '../../../_services/aerogerador.service'
import { ParqueEolicoService } from '../../../_services/parque-eolico.service'
@Component({
  selector: 'app-aerogerador-form',
  templateUrl: './aerogerador-form.component.html',
  styleUrls: ['./aerogerador-form.component.scss']
})
export class AerogeradorFormComponent implements OnChanges {
  aerogeradorForm: FormGroup
  @Input() aerogerador
  @Input() operation
  isUpdate: boolean = false
  parques: ParqueEolico[]
  parque: ParqueEolico

  constructor(
    private formBuilder: FormBuilder,
    private parqueService: ParqueEolicoService,
    private aerogeradorService: AerogeradorService
  ) { }


  onSubmit(): void {
    //cadastro
    if (!this.isUpdate) {     
      this.aerogeradorService.createAerogerador(this.aerogeradorForm.value)
        .subscribe(data => {
          window.alert("AEROGERADOR CADASTRADO COM SUCESSO!")
          location.reload();
        })
      //update  
    } else {
      this.aerogeradorForm.value.id = this.aerogerador.id
      this.aerogeradorService.updateAerogerador(this.aerogeradorForm.value)
        .subscribe(data => {
          window.alert("AEROGERADOR ATUALIZADO COM SUCESSO!")
          location.reload();
        })
    }
  }

  ngOnChanges(change: SimpleChanges) {
    if (this.operation) {
      this.isUpdate = true
      this.aerogeradorForm = this.formBuilder.group({
        nome: [this.aerogerador.nome, Validators.required],
        latitude: [this.aerogerador.latitude],
        longitude: [this.aerogerador.longitude],
        alturaTorre: [this.aerogerador.alturaTorre],
        diametroVarredura: [this.aerogerador.diametroVarredura],
        modelo: [this.aerogerador.modelo],
        parqueEolico: [this.aerogerador.parqueEolico]
      })
    } else {
      this.isUpdate = false
      this.aerogeradorForm = this.formBuilder.group({
        nome: ['', Validators.required],
        latitude: ['',],
        longitude: ['',],
        altura_torre: ['',],
        diametroVarredura: ['',],
        modelo: ['',],
        parqueEolico: ['', Validators.required]
      })
    }
  }


  ngOnInit() {
    this.parqueService.getParques()
      .subscribe(data => {
        this.parques = data;
      })
    this.aerogeradorForm = this.formBuilder.group({
      nome: ['', Validators.required],
      latitude: ['',],
      longitude: ['',],
      altura_torre: ['',],
      diametro_varredura: ['',],
      modelo: ['',],
      parqueEolico: ['', Validators.required]
    })
  }
}



