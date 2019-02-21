/**
 * Created by Gustavo Galvao on 16/07/2018.
 */
import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {isNullOrUndefined} from 'util';
import {HttpService} from './http.service';
import {environment} from '../../../environments/environment';
import {MensagemUtil} from '../util/mensagem.util';
import {Usuario, UsuarioBuilder} from '../modelos/usuario.model';
import {Observable, Subject} from 'rxjs';
import {isNull} from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private aoEntrarEvento: Subject<Usuario> = new Subject();
  private aoSairEvento: Subject<Usuario> = new Subject();
  private aoEntrarErroEvento: Subject<string> = new Subject();

  private _usuarioLogado: Usuario;

  constructor(private httpService: HttpService, private router: Router, private activeRoute : ActivatedRoute, private mensagemUtil: MensagemUtil) {
    this.carregarUsuario();
  }

  public aoEntrar(): Observable<Usuario> {
    return this.aoEntrarEvento.asObservable();
  }

  public aoSair(): Observable<Usuario> {
    return this.aoSairEvento.asObservable();
  }

  public aoEntrarErro(): Observable<string> {
    return this.aoEntrarErroEvento.asObservable();
  }

  public entrar(login: string, senha: string): void {
    this.httpService.post('/login', {login: login, senha: senha}).subscribe(response => {
      localStorage.setItem(environment.chaveTokenAcessoLocalStorage, response.token);
      this.salvarUsuario(this.serializarUsuario(response));
      this.aoEntrarEvento.next(this._usuarioLogado);
      this.router.navigateByUrl('/administrativo');
    }, erro => {
      senha = '';
      this.mensagemUtil.adicionarMensagensDeErro("Login", erro)
    });
  }

  public sair(): void {
    const usuario = this._usuarioLogado;
    localStorage.clear();
    this._usuarioLogado = null;
    this.aoSairEvento.next(usuario);
    this.router.navigateByUrl('/login');
  }

  public isLogged(): boolean {
   return isNullOrUndefined(this._usuarioLogado)

  }

  get usuarioLogado(): Usuario {
    return this._usuarioLogado;
  }

  get tokenAcesso(): string {
    return localStorage.getItem(environment.chaveTokenAcessoLocalStorage);
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
