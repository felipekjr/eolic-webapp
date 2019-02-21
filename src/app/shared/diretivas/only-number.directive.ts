import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Validator, AbstractControl, Validators, NG_VALIDATORS } from '@angular/forms';
import {isValid} from 'ngx-bootstrap/chronos/create/valid';



/**
 * This validator works like "required" but it does not allow whitespace either
 *
 * @export
 * @class OnlyNumber
 * @implements {Validator}
 */
@Directive({
  selector: '[onlyNumber]',
  providers: [{ provide: NG_VALIDATORS, useExisting: OnlyNumberDirective, multi: true }]
})
export class OnlyNumberDirective implements Validator {
  integer = /[0-9\+\-\ ]/;
  float = /^[+-]?\d+(\.\d+)?$/;
  validate(control: AbstractControl): { [key: string]: any } {
    if(!isNaN(control.value)) {
      return null
    }
    else{
      return {'mensagem':'valor inválido'}
    }
  }
}
