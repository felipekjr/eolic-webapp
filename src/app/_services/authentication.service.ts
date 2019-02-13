/**
 * Created by Gustavo Galvao on 16/07/2018.
 */
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import {isNullOrUndefined} from 'util';
import {HttpService} from './http.service';
import {environment} from '../../environments/environment';
import {MensagemUtil} from '../_util/mensagem.util';
import {Usuario, UsuarioBuilder} from '../_models/usuario.model';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _usuarioLogado: Usuario;

  constructor(private httpService: HttpService, private router: Router, private mensagemUtil: MensagemUtil) {
    this.carregarUsuario();
  }

  public entrar(login: string, senha: string): void {
    this.httpService.post('/login', {login: login, senha: senha})
      .subscribe(response => {
        console.log(response);
        localStorage.setItem(environment.chaveTokenAcessoLocalStorage, response.token);
        this.salvarUsuario(this.serializarUsuario(response));
        this.router.navigateByUrl('/home');
      }, (error) => {
        console.log(JSON.stringify(error));
      senha = '';
      this.mensagemUtil.adicionarMensagensDeErro('Login', error);
      });
  }

  public sair(): void {
    localStorage.clear();
    this._usuarioLogado = null;
    this.router.navigateByUrl('/login');
  }

  public isLogged(): boolean {
    return !isNullOrUndefined(this._usuarioLogado);
  }

  get usuarioLogado(): Usuario {
    return this._usuarioLogado;
  }

  private carregarUsuario() {
    this._usuarioLogado = JSON.parse(localStorage.getItem(environment.chaveUsuarioAcessoLocalStorage));
  }

  private salvarUsuario(usuario: Usuario) {
    localStorage.setItem(environment.chaveUsuarioAcessoLocalStorage, JSON.stringify(usuario));
    this._usuarioLogado = usuario;
  }

  private serializarUsuario(response: any): Usuario {
    return new UsuarioBuilder()
      .comID(response.id)
      .comLogin(response.login)
      .construir();
  }

}
