import { Directive } from '@angular/core';
import { Validator, AbstractControl,  NG_VALIDATORS } from '@angular/forms';

/**
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
    }else if(/\S/.test(control.value)){
      return null
    }
    else{
      return {'mensagem':'valor inválido'}
    }
  }
}
