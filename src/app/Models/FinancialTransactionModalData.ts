import { FinancialTransaction } from './FinancialTransaction';

export interface FinancialTransactionModalData {
  title: string;
  mode: 'create' | 'update' | 'view' | 'delete';
  financialTransaction: FinancialTransaction | null;
}
