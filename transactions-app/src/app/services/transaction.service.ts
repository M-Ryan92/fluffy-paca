import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction, TransactionData } from '../../shared/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getTransactions(): Observable<TransactionData> {
    return this.http.get<TransactionData>(`${this.apiUrl}/transactions`);
  }

  getTransactionByDayAndId(day: string, id: string): Observable<Transaction> {
    return this.http.get<Transaction>(
      `${this.apiUrl}/transactions/${day}/${id}`
    );
  }
}
