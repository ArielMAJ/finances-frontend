import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FinancialTransaction } from '../../Models/FinancialTransaction';
import { FinancialTransactionService } from '../../services/financialTransaction.service';

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
      value: [''],
      description: [''],
    });
  }

  ngOnInit(): void {
    this.financialTransactionService
      .getFinancialTransaction(this.data.id)
      .subscribe(
        (transaction) => {
          this.cadastroForm.patchValue({
            ...transaction,
          });
        },
        (error) => {
          this.toastr.error('Erro ao carregar transação!');
        }
      );
  }

  onSubmit(): void {
    if (this.cadastroForm.valid) {
      const formValue = this.cadastroForm.value;
      const updatedFinancialTransaction = {
        ...formValue,
      };

      this.financialTransactionService
        .updateFinancialTransaction(this.data.id, updatedFinancialTransaction)
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
  }
}
