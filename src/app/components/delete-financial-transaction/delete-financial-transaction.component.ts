import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FinancialTransaction } from '../../Models/FinancialTransaction';
import { FinancialTransactionService } from '../../services/financialTransaction.service';

@Component({
  selector: 'app-delete-financial-transaction',
  templateUrl: './delete-financial-transaction.component.html',
  styleUrl: './delete-financial-transaction.component.css',
})
export class DeleteFinancialTransactionComponent {
  financialTransaction!: FinancialTransaction;

  constructor(
    private financialTransactionService: FinancialTransactionService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: FinancialTransaction
  ) {}

  ngOnInit(): void {
    this.financialTransaction = this.data;
  }

  Delete() {
    this.financialTransactionService
      .deleteFinancialTransaction(this.financialTransaction.id)
      .subscribe(() => {
        window.location.reload();
      });
  }
}
