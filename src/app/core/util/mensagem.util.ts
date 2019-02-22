/**
 * Created by Gustavo Galvao on 16/07/2018.
 */
import {Injectable} from '@angular/core';

import {ToastrService} from 'ngx-toastr';
import {Erro} from '../modelos/dto/erro.model';
import {TranslationService} from 'angular-l10n';

@Injectable({
  providedIn: 'root'
})
export class MensagemUtil {

  private mensagemSucesso: string;

  constructor(private toastrService: ToastrService, private translationService : TranslationService) {
    this.mensagemSucesso = this.translationService.translate('operacao_realizada_com_sucesso');
    this.translationService.translationChanged().subscribe(() => {
      this.mensagemSucesso = this.translationService.translate('operacao_realizada_com_sucesso');
    });
    }
  adicionarMesagemBemVindo(mensagem?: string): void {
    this.toastrService.success(mensagem);
  }
  adicionarMesagemSucesso(casoDeUso: string, mensagem?: string): void {
    const corpo: string = mensagem ? this.translationService.translate(mensagem) : this.mensagemSucesso;
    this.toastrService.success(corpo, this.translationService.translate(casoDeUso));
  }
  adicionarMensagemDeErro(casoDeUso: string, mensagemDeErro: string) {
    this.toastrService.error(
      this.translationService.translate(mensagemDeErro),
      this.translationService.translate(casoDeUso)
    );
  }
  adicionarMensagemDeWarning(casoDeUso: string, mensagemDeWarning: string) {
    this.toastrService.warning(
      this.translationService.translate(mensagemDeWarning),
      this.translationService.translate(casoDeUso));
  }
  adicionarMensagensDeErro(casoDeUso: string, error: Erro) {
    for (const erro of error.mensagem) {
      this.adicionarMensagemDeErro(casoDeUso, erro);
    }
  }


}
