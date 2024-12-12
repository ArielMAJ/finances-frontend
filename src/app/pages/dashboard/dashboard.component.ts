import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateFinancialTransactionComponent } from '../../components/create-financial-transaction/create-financial-transaction.component';
import { DeleteFinancialTransactionComponent } from '../../components/delete-financial-transaction/delete-financial-transaction.component';
import { UpdateFinancialTransactionComponent } from '../../components/update-financial-transaction/update-financial-transaction.component';
import { ViewFinancialTransactionDetailsComponent } from '../../components/view-financial-transaction-details/view-financial-transaction-details.component';
import { FinancialTransaction } from '../../Models/FinancialTransaction';
import { FinancialTransactionService } from '../../services/financialTransaction.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  filteredFinancialTransactions: FinancialTransaction[] = [];
  allFinancialTransactions: FinancialTransaction[] = [];

  colunas = ['currency', 'transaction', 'description', 'action'];

  constructor(
    private financialTransactionService: FinancialTransactionService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.financialTransactionService
      .getFinancialTransactions()
      .subscribe((data) => {
        this.filteredFinancialTransactions = data;
        this.allFinancialTransactions = data;
      });
  }

  search(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    this.filteredFinancialTransactions = this.allFinancialTransactions.filter(
      (transaction) => {
        return (
          transaction.description.toLowerCase().includes(value.toLowerCase()) ||
          ('R$' + transaction.value.toFixed(2)).includes(value)
        );
      }
    );
  }

  openDeleteItemDialog(financialTransaction: FinancialTransaction) {
    this.dialog.open(DeleteFinancialTransactionComponent, {
      data: financialTransaction,
    });
  }
  openCreateItemDialog() {
    this.dialog.open(CreateFinancialTransactionComponent);
  }
  openViewItemDialog(financialTransaction: FinancialTransaction) {
    this.dialog.open(ViewFinancialTransactionDetailsComponent, {
      data: financialTransaction,
    });
  }

  openEditItemDialog(financialTransaction: FinancialTransaction) {
    this.dialog.open(UpdateFinancialTransactionComponent, {
      data: financialTransaction,
    });
  }
}
