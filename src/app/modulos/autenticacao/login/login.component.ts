import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../../core/http/authentication.service'
import { UserService } from '../../../core/crud/user.service'
import { Usuario } from '../../../core/modelos/usuario.model'
import { AuthGuard } from '../../../core/guards/auth.guard';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    login: string;
    senha: string;
    users : Usuario[];
    
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private authGuard: AuthGuard
    ) { }

    // get para pegar os campos do form
    get f() { return this.loginForm.controls; }

    entrarNoSistema() {
        this.login = this.f.username.value;
        this.senha = this.f.password.value;
        this.authenticationService.entrar(this.login, this.senha);
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
        // reseta o status do login
        this.authenticationService.sair();
    }
}
