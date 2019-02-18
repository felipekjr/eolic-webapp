/**
 * Created by Gustavo Galvao on 16/07/2018.
 */
import {Entidade, EntidadeBuilder} from './entidade.model';

export class UsuarioBuilder extends EntidadeBuilder<Usuario> {
  login: string;
  comLogin(valor: string): UsuarioBuilder {
    this.login = valor;
    return this;
  }

  construir(): Usuario {
    const instancia = super.construir(Usuario);
    instancia.login = this.login;
    return instancia;
  }
}

export class Usuario extends Entidade {
  login: string;
}
