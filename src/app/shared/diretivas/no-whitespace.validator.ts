import { AbstractControl, ValidatorFn } from '@angular/forms';

export function NoWhitespaceValidator(): ValidatorFn {

  return (control: AbstractControl): { [key: string]: any } => {
    if(/\S/.test(control.value)){
        return null
    }else{
      let isWhitespace = (control.value || '').trim().length === 0;
      let isValid = !isWhitespace;
      return isValid ? null : { 'whitespace': 'value is only whitespace' }
    }
  };
}
