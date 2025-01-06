import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterModel } from '../../Models/RegisterModel';
import { LoginService } from '../../services/login.service';
import { HealthService } from '../../services/health.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  cadastroForm!: FormGroup;
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private toastr: ToastrService,
    private healthService: HealthService
  ) {
    this.cadastroForm = this.formBuilder.group(
      {
        name: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        passwordConfirmation: new FormControl('', [Validators.required]),
        age: [
          '',
          [Validators.required, Validators.min(18), Validators.max(120)],
        ],
        accountNumber: ['', [Validators.required]],
      },
      { validators: this.checkPasswordsMatch }
    );
  }

  ngOnInit(): void {
    this.healthService
      .healthCheck().subscribe()
  }

  checkPasswordsMatch(group: FormGroup) {
    const password = group.get('password')?.value;
    const passwordConfirmation = group.get('passwordConfirmation')?.value;
    return password === passwordConfirmation
      ? null
      : { passwordsDoNotMatch: true };
  }

  submitRegister() {
    this.loading = true;
    let dadosLogin = this.cadastroForm.getRawValue();
    delete dadosLogin.passwordConfirmation;

    this.loginService.userRegister(dadosLogin as RegisterModel).subscribe(
      (response) => {
        this.toastr.success('Cadastro realizado com sucesso!', 'Sucesso');
        this.cadastroForm.reset();
        this.router.navigate(['/login']);
      },
      (error) => {
        this.loading = false;

        if (error.name === 'TimeoutError' || error.statusText === 'Unknown Error') {
          return
        }

        if (error.error.detail.includes("Email already in use")) {
          this.toastr.error('E-mail já está em uso. Por favor digite um diferente.', 'Erro ao cadastrar');
          return;
        }
        if (error.error.detail.includes("Account number already in use")) {
          this.toastr.error('Número da conta já está em uso. Por favor digite uma conta diferente diferente.', 'Erro ao cadastrar');
          return;
        }
        this.toastr.error('Um erro inesperado aconteceu.', 'Erro ao cadastrar');
      }
    );
  }
}
