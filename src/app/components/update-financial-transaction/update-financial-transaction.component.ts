import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FinancialTransaction } from '../../Models/FinancialTransaction';
import { FinancialTransactionCreateRequest } from '../../Models/FinancialTransactionCreateRequest';
import { FinancialTransactionService } from '../../services/financialTransaction.service';
import { applyCurrencyMask } from '../../common/utils';

@Component({
  selector: 'app-update-financial-transaction',
  templateUrl: './update-financial-transaction.component.html',
  styleUrls: ['./update-financial-transaction.component.css'],
  providers: [DatePipe],
})
export class UpdateFinancialTransactionComponent implements OnInit {
  cadastroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private financialTransactionService: FinancialTransactionService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: FinancialTransaction
  ) {
    this.cadastroForm = this.fb.group({
      value: ['R$ 0,00', Validators.required],
      description: [''],
    });
  }

  ngOnInit(): void {
    this.financialTransactionService
      .getFinancialTransaction(this.data.id)
      .subscribe(
        (transaction) => {
          return this.cadastroForm.patchValue({
            value: applyCurrencyMask(this.data.value.toString()),
            description: this.data.description,
          });
        },
        (error) => {
          this.toastr.error('Erro ao carregar transação!');
        }
      );
  }

  onSubmit(): void {
    const formValues = this.cadastroForm.value;
    const valueString: string = formValues.value
      .replace('R$ ', '')
      .replace(/\./g, '')
      .replace(',', '.')
      .replace(' ', '');

    const financialTransactionData: FinancialTransactionCreateRequest = {
      value: parseFloat(valueString),
      description: formValues.description,
    };

    this.financialTransactionService
      .updateFinancialTransaction(this.data.id, financialTransactionData)
      .subscribe(
        (response) => {
          this.toastr.success('Transação editada com sucesso!');
          window.location.reload();
        },
        (error) => {
          console.error('Erro ao editar transação:', error);
          this.toastr.error('Erro ao editar transação!');
        }
      );
  }

  applyCurrencyMaskOnEvent(event: Event) {
    const input = event.target as HTMLInputElement;
    let maskedValue = applyCurrencyMask(input.value)
    this.cadastroForm.get('value')?.setValue(maskedValue, {
      emitEvent: false,
    });
  }


}
