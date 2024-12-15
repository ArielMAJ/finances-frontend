import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FinancialTransactionComponent } from '../../components/financial-transaction/financial-transaction.component';
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
    this.dialog.open(FinancialTransactionComponent, {
      data: {
        title: 'Deletar',
        mode: 'delete',
        financialTransaction: financialTransaction,
      },
    });
  }
  openCreateItemDialog() {
    this.dialog.open(FinancialTransactionComponent, {
      data: {
        title: 'Cadastrar',
        mode: 'create',
      },
    });
  }
  openViewItemDialog(financialTransaction: FinancialTransaction) {
    this.dialog.open(FinancialTransactionComponent, {
      data: {
        title: 'Detalhes da',
        mode: 'view',
        financialTransaction: financialTransaction,
      },
    });
  }

  openUpdateItemDialog(financialTransaction: FinancialTransaction) {
    this.dialog.open(FinancialTransactionComponent, {
      data: {
        title: 'Atualizar',
        mode: 'update',
        financialTransaction: financialTransaction,
      },
    });
  }
}
