/**
 * Created by Gustavo Galvao on 16/07/2018.
 */
import {HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {Erro} from '../_models/dto/erro.model';

export class HttpUtil {

  public static url(path: string): string {
    return environment.apiUrl + path;
  }

  public static headers() {
    const headersParams = {'Content-Type': 'application/json;charset=utf-8'};
    headersParams['Accept'] = 'application/json';
    headersParams['X-Origem'] = 'WINBOX_WEB';
    const token: string = localStorage.getItem(environment.chaveTokenAcessoLocalStorage);
    if (token) {
      headersParams['Authorization'] = 'Bearer ' + token;
    }
    return {headers: new HttpHeaders(headersParams)};
  }

  // public static extrairDados(response: HttpResponse): any {
  //   return response.json() || {};
  // }

  public static processarErro(error: HttpErrorResponse) {
    // const body = error.json();
    // let mensagens: string[];
    // if (body.errors) {
    //   mensagens = HttpUtilService.getMensagensDeErro(body.errors);
    // } else {
    //   mensagens = ['Server connection error'];
    // }
    // let erro: Erro = new Erro(error.status, mensagens);
    // return Observable.throw(erro);
    let mensagens: string[];
    if (error.error instanceof ProgressEvent) {
      mensagens = ['erro.conexao_servidor'];
    } else if (error.error.status === '404') {
      mensagens = ['erro.endpoint_nao_encontrado_na_api'];
    } else if (error.error.status === '500') {
      mensagens = ['erro.erro_interno_no_servidor'];
    } else {
      mensagens = HttpUtil.getMensagensDeErro(error.error);
    }
    const erro: Erro = new Erro(error.status, mensagens);
    return throwError(erro);
  }

  public static downloadFile(type: string, response: Blob, nomeArquivo: string) {
    const blob = new Blob([response], { type: type });
    const url = window.URL.createObjectURL(blob);

    if (navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(blob);
    } else {
      const a = document.createElement('a');
      a.href = url;
      a.download = nomeArquivo;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
    window.URL.revokeObjectURL(url);
  }

  private static getMensagensDeErro(errors: any): string[] {
    const mensagens: string[] = [];
    for (const error of errors.errosGerais) {
      mensagens.push(error.codigo);
    }
    return mensagens;
  }
}
