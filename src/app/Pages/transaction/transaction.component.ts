import { Component, inject } from '@angular/core';
import { TransactionService } from '../../Service/transaction.service';
import { Transaction } from '../../types/transaction';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css',
})
export class TransactionComponent {
  newTransaction: Transaction = new Transaction('', '', '', 0, 0);
  transactions!: Transaction[];
  router = inject(Router);

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.transactionService.getTransactions().subscribe((response: any) => {
      this.transactions = response;
      this.transactions.sort((a, b) => {
        return Date.parse(a.date) - Date.parse(b.date);
      });
      this.transactionService.calculateBalances();
    });
  }

  onSubmit() {
    if (
      this.newTransaction.counterparty &&
      this.newTransaction.date &&
      this.newTransaction.narration
    ) {
      this.transactionService.addTransaction(this.newTransaction);
      this.newTransaction = new Transaction('', '', '', 0, 0);
    } else {
      alert('Fields Cannot Be Empty');
    }
  }

  Discard() {
    this.router.navigate(['list']);
  }
}
