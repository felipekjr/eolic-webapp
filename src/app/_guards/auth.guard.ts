import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../_services/authentication.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ){}
  
  canActivate(route : ActivatedRouteSnapshot, state: RouterStateSnapshot){    
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))    
    if(currentUser){      
      //o usuário está logado
      return true;
    }
    this.router.navigate(['/login'],{queryParams:{returnUrl: state.url}});
    return false;
  }   
  
}
