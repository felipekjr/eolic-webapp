/**
 * Created by Gustavo Galvao on 16/07/2018.
 */
import {Injectable} from '@angular/core';

import {ToastrService} from 'ngx-toastr';
import {Erro} from '../modelos/dto/erro.model';

@Injectable({
  providedIn: 'root'
})
export class MensagemUtil {

  private mensagemSucesso: string;

  constructor(private toastrService: ToastrService) {
    this.mensagemSucesso = 'Operaçao realizada com sucesso!';
    }
  adicionarMesagemBemVindo(mensagem?: string): void {
    this.toastrService.success(mensagem);
  }
  adicionarMesagemSucesso(casoDeUso: string, mensagem?: string): void {
    const corpo: string = this.mensagemSucesso;
    this.toastrService.success(corpo, casoDeUso);
  }

  adicionarMensagemDeErro(casoDeUso: string, mensagemDeErro: string) {
    console.log( this.toastrService.error(
      mensagemDeErro,
      casoDeUso
    ))
   ;
  }

  adicionarMensagemDeWarning(casoDeUso: string, mensagemDeWarning: string) {
    this.toastrService.warning(mensagemDeWarning, casoDeUso);
  }

  adicionarMensagensDeErro(casoDeUso: string, error: Erro) {
    for (const erro of error.mensagem) {
      this.adicionarMensagemDeErro(casoDeUso, erro);
    }
  }


}
