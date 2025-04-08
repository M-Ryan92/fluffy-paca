import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Day } from '../../../shared/types';
import { TransactionService } from '../../services/transaction.service';
import { Component } from '@angular/core';
import { MonthContainerComponent } from './month-container/month-container.component';
import { DayContainerComponent } from './day-container/day-container.component';
type groupedTransactions = Record<string, Day[]>;
@Component({
  selector: 'app-transactions-view',
  imports: [CommonModule, MonthContainerComponent, DayContainerComponent],
  templateUrl: './transactionsView.component.html',
  styleUrls: ['./transactionsView.component.scss'],
})
export class TransactionsViewComponent {
  day: string | null = null;
  id: string | null = null;

  transactions: { month: string; days: Day[] }[] = [];

  constructor(
    private route: ActivatedRoute,
    private transactionService: TransactionService
  ) {
    this.transactionService.getTransactions().subscribe((transactions) => {
      const grouped = transactions.days.reduce((acc, day) => {
        const date = new Date(day.id);
        const monthShort = date.toLocaleString('default', {
          month: 'short',
        });

        acc[monthShort] = acc[monthShort] || [];
        acc[monthShort].push(day);
        return acc;
      }, {} as groupedTransactions);

      this.transactions = Object.entries(grouped).map(([month, days]) => ({
        month,
        days,
      }));
    });
  }
}
