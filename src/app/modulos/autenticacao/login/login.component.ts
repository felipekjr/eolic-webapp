import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthenticationService} from '../../../core/http/authentication.service';
import {UserService} from '../../../core/crud/user.service';
import {Usuario} from '../../../core/modelos/usuario.model';
import {AuthGuard} from '../../../core/guards/auth.guard';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hasParametrosLogin: boolean;
  msgErroLogin : string;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private authGuard: AuthGuard
  ) {
  }

  // get para pegar os campos do form
  get login() {
    return this.loginForm.get('login');
  }

  get senha() {
    return this.loginForm.get('senha');
  }

  entrarNoSistema() {
    this.authenticationService.entrar(this.login.value, this.senha.value);
  }

  ngOnInit() {
    this.authenticationService.aoEntrarErro().subscribe(erro => {
      this.msgErroLogin = erro;
    });
    this.loginForm = this.formBuilder.group({
      login: ['', Validators.required],
      senha: ['', Validators.required]
    });
    this.authenticationService.sair();
    this.hasParametrosLogin = false;
  }
}
