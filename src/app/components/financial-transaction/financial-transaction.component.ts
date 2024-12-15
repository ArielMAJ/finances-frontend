import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { applyCurrencyMask } from '../../common/utils';
import { FinancialTransactionCreateRequest } from '../../Models/FinancialTransactionCreateRequest';
import { FinancialTransactionModalData } from '../../Models/FinancialTransactionModalData';
import { FinancialTransactionService } from '../../services/financialTransaction.service';
import { DeletionConfirmationModalComponent } from '../deletion-confirmation-modal/deletion-confirmation-modal.component';

@Component({
  selector: 'app-financial-transaction',
  templateUrl: './financial-transaction.component.html',
  styleUrls: ['./financial-transaction.component.css'],
  providers: [DatePipe],
})
export class FinancialTransactionComponent implements OnInit {
  transactionForm: FormGroup;
  isViewMode: boolean = false;
  isDeleteMode: boolean = false;
  formattedCreatedAt?: string | null;
  formattedUpdatedAt?: string | null;

  constructor(
    private fb: FormBuilder,
    private financialTransactionService: FinancialTransactionService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: FinancialTransactionModalData
  ) {
    const formData = {
      value: ['R$ 0,00', Validators.required],
      description: [''],
    };
    if (this.data.financialTransaction) {
      formData.value[0] = applyCurrencyMask(
        this.data.financialTransaction.value.toFixed(2)
      ).toString();
      formData.description[0] = this.data.financialTransaction.description;
    }
    this.transactionForm = this.fb.group(formData);
    this.isViewMode = this.data.mode === 'view';
    this.isDeleteMode = this.data.mode === 'delete';
    if (this.isViewMode || this.isDeleteMode) {
      this.transactionForm.controls['value'].disable();
      this.transactionForm.controls['description'].disable();
      this.formattedCreatedAt = this.datePipe.transform(
        new Date(this.data.financialTransaction!.createdAt),
        'yyyy-MM-dd'
      );
      this.formattedUpdatedAt = this.datePipe.transform(
        new Date(this.data.financialTransaction!.updatedAt),
        'yyyy-MM-dd'
      );
    }
  }

  ngOnInit(): void {}

  onSubmit() {
    const formValues = this.transactionForm.value;
    const valueString: string = formValues.value
      .replace('R$ ', '')
      .replace(/\./g, '')
      .replace(',', '.')
      .replace(' ', '');

    const financialTransactionData: FinancialTransactionCreateRequest = {
      value: parseFloat(valueString),
      description: formValues.description,
    };

    const action: {
      [key: string]: (
        financialTransactionData: FinancialTransactionCreateRequest | null
      ) => void;
    } = {
      create: this.create.bind(this),
      update: this.update.bind(this),
      delete: this.delete.bind(this),
    };

    if (action[this.data.mode])
      action[this.data.mode](financialTransactionData);
  }

  private create(requestPayload: FinancialTransactionCreateRequest | null) {
    this.financialTransactionService
      .createFinancialTransaction(requestPayload!)
      .subscribe(
        () => {
          this.toastr.success('Cadastro realizado com sucesso!', 'Sucesso');
          this.transactionForm.reset();
          window.location.reload();
        },
        () => {
          this.toastr.error('Erro ao cadastrar transação!');
        }
      );
  }
  private update(requestPayload: FinancialTransactionCreateRequest | null) {
    this.financialTransactionService
      .updateFinancialTransaction(
        this.data.financialTransaction!.id,
        requestPayload!
      )
      .subscribe(
        () => {
          this.toastr.success('Transação atualizada com sucesso!');
          window.location.reload();
        },
        () => {
          this.toastr.error('Erro ao atualizar transação!');
        }
      );
  }

  private delete() {
    const dialogRef = this.dialog.open(DeletionConfirmationModalComponent);

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (!confirmed) return;

      this.financialTransactionService
        .deleteFinancialTransaction(this.data.financialTransaction!.id)
        .subscribe(() => {
          window.location.reload();
        });
    });
  }
  applyCurrencyMaskOnEvent(event: Event) {
    const input = event.target as HTMLInputElement;
    let maskedValue = applyCurrencyMask(input.value);
    this.transactionForm.get('value')?.setValue(maskedValue, {
      emitEvent: false,
    });
  }
}
