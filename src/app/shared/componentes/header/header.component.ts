import {Component, Input, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../core/http/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() usuarioLogado
  constructor(
    private authenticationService : AuthenticationService
  ) { }
  logOut(){
     this.authenticationService.sair()
  }
  ngOnInit() {
  }

}
