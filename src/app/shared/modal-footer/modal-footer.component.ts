import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'modal-footer',
  templateUrl: './modal-footer.component.html'
})
export class ModalFooterComponent {

  @Input() isEdicao: boolean;
  @Input() formValid: boolean;
  @Output() clickCloseButton: EventEmitter<any> = new EventEmitter();

  constructor() { }

  onClickCloseButton(event) {
    this.clickCloseButton.next(event);
  }

}
