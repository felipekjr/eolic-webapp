import { Component, OnInit } from '@angular/core';
import {MensagemUtil} from '../../core/util/mensagem.util';
import {AuthenticationService} from '../../core/http/authentication.service';
import {Usuario} from '../../core/modelos/usuario.model';

@Component({
  selector: 'app-administrativo',
  templateUrl: './administrativo.component.html'
})
export class AdministrativoComponent implements OnInit {
  usuarioLogado : Usuario
  constructor(
    private mensagemUtil : MensagemUtil,
    private authenticationService : AuthenticationService
  ) { }

  ngOnInit() {
    setTimeout(
      () => this.mensagemUtil.adicionarMesagemBemVindo("Bem vindo " + `${this.authenticationService.usuarioLogado.login}` + "!"),
      500
    )
  }

}
