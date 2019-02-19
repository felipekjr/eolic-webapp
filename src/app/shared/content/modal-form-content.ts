/**
 * Created by Gustavo Galvao on 21/08/2018.
 */
import {combineLatest, Subscription} from 'rxjs';
import {ChangeDetectorRef} from '@angular/core';

export abstract class ModalFormContentComponent {

  isEdicao = false;

  modalEventsSubscription: Subscription[] = [];

  constructor(protected changeDetection: ChangeDetectorRef) {
  }

  public openModal(template: any) {
    const _combine = combineLatest(
      template.onHidden
    ).subscribe(() => this.changeDetection.markForCheck());

    this.modalEventsSubscription.push(
      template.onHidden.subscribe(() => {
        this.executeAfterModalHide();
        this.isEdicao = false;
        this.unsubscribe();
      })
    );

    this.modalEventsSubscription.push(_combine);

    template.show();
  }

  public closeModal(template: any) {
    template.hide();
  }

  public validarAntesDeSalvarEntidade(form: any) {
    if (form.invalid) {
      return;
    } else {
      this.persistirEntidade();
    }
  }

  abstract executeAfterModalHide();

  abstract persistirEntidade(entidade?: any);

  unsubscribe() {
    this.modalEventsSubscription.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.modalEventsSubscription = [];
  }
}

