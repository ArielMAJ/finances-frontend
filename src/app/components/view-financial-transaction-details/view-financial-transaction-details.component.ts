import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FinancialTransaction } from '../../Models/FinancialTransaction';
import { FinancialTransactionService } from '../../services/financialTransaction.service';

@Component({
  selector: 'app-financial-transaction-details',
  templateUrl: './view-financial-transaction-details.component.html',
  styleUrl: './view-financial-transaction-details.component.css',
  providers: [DatePipe],
})
export class ViewFinancialTransactionDetailsComponent implements OnInit {
  financialTransaction?: FinancialTransaction;
  formattedCreatedAt?: string | null;
  formattedUpdatedAt?: string | null;

  constructor(
    private financialTransactionService: FinancialTransactionService,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: FinancialTransaction
  ) {}

  ngOnInit(): void {
    this.financialTransactionService
      .getFinancialTransaction(this.data.id)
      .subscribe((data) => {
        this.financialTransaction = data;

        if (this.financialTransaction?.createdAt) {
          const date = new Date(this.financialTransaction.createdAt);
          this.formattedCreatedAt = this.datePipe.transform(date, 'yyyy-MM-dd');
        }
        if (this.financialTransaction?.updatedAt) {
          const date = new Date(this.financialTransaction.updatedAt);
          this.formattedUpdatedAt = this.datePipe.transform(date, 'yyyy-MM-dd');
        }
      });
  }
}
