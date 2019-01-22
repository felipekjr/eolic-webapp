import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service'
import { UserService } from '../_services/user.service'
import { User } from '../_models/user'
import { AuthGuard } from '../_guards/auth.guard';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    returnUrl;
    user: User = new User();
    users: User[];
    hasMatchUser: boolean
    loading;
    submitted;
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
    onSubmit() {
        this.user.login = this.f.username.value;
        this.user.senha = this.f.password.value;        
        this.users.forEach(user => {
            if (user.senha == this.user.senha && user.login == this.user.login) {
                this.user.token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhIiwiZXhwIjoxNTQ4OTg2MzA1fQ.366fGtjXP9VqnSDfSZK0YbiiCjL8gCqf61MOqV9YCdFghy1iNdivKih5RRlIo6fHZOTpraABUvCxH1k-nkPY2w'
                this.authenticationService.login(this.user)
                this.hasMatchUser = true;
            }
        });
        if (this.hasMatchUser) {
            this.router.navigate(['/home']);
        } else {
            window.alert("LOGIN E SENHA INVÁLIDOS");
        }
    }

    cadastrar() {
        this.user.login = this.f.username.value;
        this.user.senha = this.f.password.value;
        this.userService.createUser(this.user).subscribe(
            data => {
                if (data) {
                    this.user.token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhIiwiZXhwIjoxNTQ4OTg2MzA1fQ.366fGtjXP9VqnSDfSZK0YbiiCjL8gCqf61MOqV9YCdFghy1iNdivKih5RRlIo6fHZOTpraABUvCxH1k-nkPY2w'
                    this.authenticationService.login(this.user)                    
                    window.alert("USUARIO CADASTRADO COM SUCESSO!");
                    this.router.navigate(['/home']);
                }
            }
        )
    }

    ngOnInit() {
        this.userService.getUsers().subscribe(
            data => {
                if (data) {
                    this.users = data;
                }
            }
        )
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
        // reseta o status do login
        this.authenticationService.logout();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
}
