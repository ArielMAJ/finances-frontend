import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FinancialTransactionCreateRequest } from '../../Models/FinancialTransactionCreateRequest';
import { FinancialTransactionService } from '../../services/financialTransaction.service';

@Component({
  selector: 'app-create-financial-transaction',
  templateUrl: './create-financial-transaction.component.html',
  styleUrls: ['./create-financial-transaction.component.css'],
})
export class CreateFinancialTransactionComponent implements OnInit {
  cadastroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private financialTransactionService: FinancialTransactionService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.cadastroForm = this.fb.group({
      value: ['R$ 0.00', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    const formValues = this.cadastroForm.value;

    const valueString: string = formValues.value
      .replace('R$ ', '')
      .replace(/\./g, '')
      .replace(',', '.');

    const financialTransactionData: FinancialTransactionCreateRequest = {
      value: parseFloat(valueString),
      description: formValues.description,
    };

    this.financialTransactionService
      .createFinancialTransaction(financialTransactionData)
      .subscribe(
        (response) => {
          this.toastr.success('Cadastro realizado com sucesso!', 'Sucesso');
          this.cadastroForm.reset();
          window.location.reload();
        },
        (error) => {
          this.toastr.error('Erro ao realizar cadastro!', 'Erro');
          console.error('Erro ao cadastrar usuário', error);
        }
      );
  }

  applyCurrencyMask(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');

    const parsedValue = (parseInt(value || '0', 10) / 100).toFixed(2);
    const formattedValue = parsedValue.replace('.', ',').replace(/\d(?=(\d{3})+\.)/g, '$&.');
    input.value = `R$ ${formattedValue}`;
    this.cadastroForm.get('value')?.setValue(input.value, {
      emitEvent: false,
    });
  }
}
