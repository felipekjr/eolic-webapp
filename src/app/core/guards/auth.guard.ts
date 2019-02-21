/**
 * Created by Gustavo Galvao on 16/07/2018.
 */
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import { AuthenticationService } from '../http/authentication.service'

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const usuarioLogado = this.authenticationService.usuarioLogado
    if (!usuarioLogado) {
      this.router.navigateByUrl('/login');
    }
    return true;
  }
}
