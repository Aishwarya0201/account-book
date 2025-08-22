import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '../../Service/transaction.service';
import { Transaction } from '../../types/transaction';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent {
  newTransaction: Transaction = new Transaction('', '', '', 0, 0);
  transactions!: Transaction[];
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  deleteId: any;

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.deleteId = id;
    this.transactionService.getsingleTransaction(id).subscribe((res: any) => {
      this.newTransaction = res;
    });
  }

  onSubmit() {
    if (
      this.newTransaction.counterparty &&
      this.newTransaction.date &&
      this.newTransaction.narration
    ) {
      this.transactionService
        .editTransaction(this.newTransaction)
        .subscribe(() => {
          this.router.navigate(['list']);
        });
    } else {
      alert('Fields Cannot Be Empty');
    }
  }

  Discard() {
    this.router.navigate(['list']);
  }

  delet() {
    let id = this.deleteId;
    if (confirm('Are you sure to delete')) {
      this.transactionService.deleteTransaction(id).subscribe(() => {
        this.router.navigate(['list']);
      });
    }
  }
}
