/**
 * Created by Gustavo Galvao on 16/07/2018.
 */
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';

import {Router} from '@angular/router';
import {catchError} from 'rxjs/internal/operators';
import {Erro} from '../_models/dto/erro.model';
import {HttpUtil} from '../_util/http.util';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient, private router: Router) {}

  public post(url: string, parametros: any): Observable<any> {
    return Observable.create((observer: Subject<any>) => {
      /*
      this.slimLoadingBarService.progress = 30;
      this.slimLoadingBarService.start();
      */
      this.http.post(HttpUtil.url(url), parametros, HttpUtil.headers())
        .pipe(
          catchError(HttpUtil.processarErro)
        )
        .subscribe(data => {
          // this.slimLoadingBarService.complete();
          observer.next(data);
          observer.complete();
        }, error => {
          // this.slimLoadingBarService.complete();
          this.verificarAutenticacaoValida(error);
          observer.error(error);
          observer.complete();
        });
    });
  }

  public get(url: string): Observable<any> {
    return Observable.create((observer: Subject<any>) => {
      /*
      this.slimLoadingBarService.progress = 30;
      this.slimLoadingBarService.start();
      */
      const subscribe: Observable<any> = this.http
        .get(HttpUtil.url(url), HttpUtil.headers())
        .pipe(
          catchError(HttpUtil.processarErro)
        );
      subscribe.subscribe(data => {
        // this.slimLoadingBarService.complete();
        observer.next(data);
        observer.complete();
      }, error => {
        // this.slimLoadingBarService.complete();
        this.verificarAutenticacaoValida(error);
        observer.error(error);
        observer.complete();
      });
    });
  }

  public delete(url: string): Observable<any> {
    return Observable.create((observer: Subject<any>) => {
      /*
      this.slimLoadingBarService.progress = 30;
      this.slimLoadingBarService.start();
      */
      const subscribe: Observable<any> = this.http
        .delete(HttpUtil.url(url), HttpUtil.headers())
        .pipe(
          catchError(HttpUtil.processarErro)
        );
      subscribe.subscribe(data => {
        // this.slimLoadingBarService.complete();
        observer.next(data);
        observer.complete();
      }, error => {
        // this.slimLoadingBarService.complete();
        this.verificarAutenticacaoValida(error);
        observer.error(error);
        observer.complete();
      });
    });
  }

  public put(url: string, parametros: any): Observable<any> {
    return Observable.create((observer: Subject<any>) => {
      /*
      this.slimLoadingBarService.progress = 30;
      this.slimLoadingBarService.start();
      */
      this.http.put(HttpUtil.url(url), parametros, HttpUtil.headers())
        .pipe(
          catchError(HttpUtil.processarErro)
        )
        .subscribe(data => {
          // this.slimLoadingBarService.complete();
          observer.next(data);
          observer.complete();
        }, error => {
          // this.slimLoadingBarService.complete();
          this.verificarAutenticacaoValida(error);
          observer.error(error);
          observer.complete();
        });
    });
  }

  public download(url: string, parametros: any): Observable<Blob> {
    return this.http.post(HttpUtil.url(url), parametros, {responseType: 'blob'})
      .pipe(
        catchError(HttpUtil.processarErro)
      );
  }

  private verificarAutenticacaoValida(erro: Erro) {
    if (erro.status === 401) {
      localStorage.clear();
      this.router.navigateByUrl('/login');
    }
  }
}
