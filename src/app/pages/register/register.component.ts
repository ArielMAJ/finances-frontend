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

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  cadastroForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private toastr: ToastrService
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

  checkPasswordsMatch(group: FormGroup) {
    const password = group.get('password')?.value;
    const passwordConfirmation = group.get('passwordConfirmation')?.value;
    return password === passwordConfirmation
      ? null
      : { passwordsDoNotMatch: true };
  }

  submitRegister() {
    let dadosLogin = this.cadastroForm.getRawValue();
    delete dadosLogin.passwordConfirmation;

    this.loginService.userRegister(dadosLogin as RegisterModel).subscribe(
      (response) => {
        this.toastr.success('Cadastro realizado com sucesso!', 'Sucesso');
        this.cadastroForm.reset();
        this.router.navigate(['/login']);
      },
      (error) => {
        this.toastr.error('Erro ao realizar cadastro!', 'Erro');
      }
    );
  }
}
