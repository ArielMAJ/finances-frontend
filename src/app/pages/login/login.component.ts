import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from '../../Models/LoginModel';
import { LoginService } from '../../services/login.service';
import { LoginResponseModel } from '../../Models/LoginResponseModel';
import { HealthService } from '../../services/health.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private toastr: ToastrService,
    private healthService: HealthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.healthService.healthCheck().subscribe();
  }

  submitLogin() {
    this.loading = true;
    const dadosLogin = this.loginForm.getRawValue() as LoginModel;

    this.loginService.userLogin(dadosLogin).subscribe(
      (response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem(
          'expiresAt',
          (new Date().getTime() + response.expiresIn - 5000).toString()
        );

        this.router.navigate(['/dashboard']);
        this.toastr.success('Login realizado com sucesso!', 'Sucesso');
      },
      (error) => {
        this.loading = false;

        if (
          error.name === 'TimeoutError' ||
          error.statusText === 'Unknown Error'
        ) {
          return;
        }

        if (error.error.detail.includes('User Account not found')) {
          this.toastr.error(
            'Usuário não encontrado.',
            'Erro ao acessar a plataforma'
          );
          return;
        }
        if (error.error.detail.includes('Invalid authentication input')) {
          this.toastr.error('Senha inválida.', 'Erro ao acessar a plataforma');
          return;
        }
        this.toastr.error(
          'Um erro inesperado aconteceu.',
          'Erro ao acessar a plataforma'
        );
      }
    );
  }
}
