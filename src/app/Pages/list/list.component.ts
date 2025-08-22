import { Component, inject } from '@angular/core';
import { TransactionService } from '../../Service/transaction.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  transactions: any = [];

  service = inject(TransactionService);
  router = inject(Router);

  ngOnInit(): void {
    this.getTransactions();
  }

  getTransactions() {
    this.service.getallTransaction().subscribe((result: any) => {
      this.transactions = result.sort(
        (
          a: { article_date: string | number | Date },
          b: { article_date: string | number | Date }
        ) => {
          return (
            (new Date(a.article_date).getTime() -
              new Date(b.article_date).getTime()) *
            -1
          );
        }
      );
    });
  }

  edit(data: any) {
    this.router.navigate(['edit/' + data.id]);
  }
}
