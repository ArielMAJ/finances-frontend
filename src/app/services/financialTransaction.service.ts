import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { FinancialTransaction } from '../Models/FinancialTransaction';
import { FinancialTransactionCreateRequest } from '../Models/FinancialTransactionCreateRequest';

@Injectable({
  providedIn: 'root',
})
export class FinancialTransactionService {
  private readonly apiUrl = `${environment.endPoint}/user/me/transactions`;

  constructor(private httpClient: HttpClient) {}

  getFinancialTransactions(): Observable<FinancialTransaction[]> {
    return this.httpClient.get<FinancialTransaction[]>(this.apiUrl);
  }

  getFinancialTransaction(id: Number): Observable<FinancialTransaction> {
    return this.httpClient.get<FinancialTransaction>(`${this.apiUrl}/${id}`);
  }

  createFinancialTransaction(
    payload: FinancialTransactionCreateRequest
  ): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}`, payload);
  }

  updateFinancialTransaction(
    id: Number,
    financialTransaction: FinancialTransactionCreateRequest
  ): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.put<void>(url, financialTransaction);
  }

  deleteFinancialTransaction(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }

  getTotalTransactionValue(): Observable<Number> {
    return this.httpClient.get<Number>(`${this.apiUrl}/total`);
  }
}
