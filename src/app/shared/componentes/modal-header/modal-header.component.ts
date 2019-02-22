import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'modal-header',
  templateUrl: './modal-header.component.html'
})
export class ModalHeaderComponent {
  @Input() title: string;
  @Output() clickCloseButton: EventEmitter<any> = new EventEmitter();

  constructor() {}

  onClickCloseButton(event) {
    this.clickCloseButton.next(event);
  }

}
