import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Transaction } from '../types/transaction';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  apiTransaction = 'http://localhost:3000/accounts';
  router = inject(Router);

  constructor(private httpClient: HttpClient) {}

  getallTransaction() {
    return this.httpClient.get(this.apiTransaction);
  }

  getsingleTransaction(id: any) {
    return this.httpClient.get(`${this.apiTransaction}/${id}`);
  }

  addnewTransaction(data: any) {
    return this.httpClient.post(this.apiTransaction, data);
  }

  editTransaction(data: any) {
    return this.httpClient.put(`${this.apiTransaction}/${data.id}`, data);
  }

  deleteTransaction(id: any) {
    return this.httpClient.delete(`${this.apiTransaction}/${id}`);
  }

  private openingBalance: number = 1000;
  private transactions: Transaction[] = [];

  addTransaction(transaction: Transaction) {
    this.httpClient
      .post(this.apiTransaction, transaction)
      .subscribe((response: any) => {
        this.transactions.push(response);
        this.transactions.sort((a, b) => {
          return Date.parse(a.date) - Date.parse(b.date);
        });
        this.calculateBalances();
        const updatedTransaction = {
          ...response,
          balance: this.transactions[this.transactions.length - 1].balance,
        };
        this.httpClient
          .put(`${this.apiTransaction}/${response.id}`, updatedTransaction)
          .subscribe(() => {
            this.router.navigate(['list']);
          });
      });
  }

  getTransactions() {
    return this.httpClient.get(this.apiTransaction);
  }

  calculateBalances() {
    let balance = this.openingBalance;
    this.transactions.forEach((transaction) => {
      if (transaction.debit) {
        balance -= transaction.debit;
      } else if (transaction.credit) {
        balance += transaction.credit;
      }
      transaction.balance = balance;
    });
  }
}
