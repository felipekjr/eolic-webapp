/**
 * Created by Gustavo Galvao on 08/08/2018.
 */
import {HttpService} from './http.service';
import {Observable} from 'rxjs';
import {Entidade} from '../_models/entidade.model';

export abstract class AbstractCrudService<T extends Entidade> {

  constructor(protected httpService: HttpService) {

  }

  public buscarPorId(id: number): Observable<any> {
    return this.httpService.get(this.getUrlBaseComId(id));
  }

  public salvar(entidade: T): Observable<any> {
    const parametros = JSON.stringify(entidade);
    return this.httpService.post(this.getUrlBase() + '/', parametros);
  }

  public editar(entidade: T): Observable<any> {
    const parametros = JSON.stringify(entidade);
    return this.httpService.put(this.getUrlBaseComId(entidade.id), parametros);
  }

  public deletar(id: number): Observable<any> {
    return this.httpService.delete(this.getUrlBaseComId(id));
  }

  public todos(): Observable<any> {
    return this.httpService.get(this.getUrlBase());
  }

  private getUrlBaseComId(id: number): string {
    return this.getUrlBase() + '/' + id;
  }

  public abstract getUrlBase(): string;
}
