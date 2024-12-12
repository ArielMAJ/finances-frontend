import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from '../../Models/LoginModel';
import { LoginService } from '../../services/login.service';
import { LoginResponseModel } from '../../Models/LoginResponseModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private toastr: ToastrService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  submitLogin() {
    const dadosLogin = this.loginForm.getRawValue() as LoginModel;

    this.loginService.userLogin(dadosLogin).subscribe(
      (response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('expiresAt', (new Date().getTime() + response.expiresIn - 5000).toString());

        this.router.navigate(['/dashboard']);
        this.toastr.success('Login realizado com sucesso!', 'Sucesso');
      },
      (erro) => {
        this.toastr.error('Erro ao fazer login!', 'Erro');
      }
    );
  }
}
