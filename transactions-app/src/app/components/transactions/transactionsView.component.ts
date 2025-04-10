import { CommonModule } from '@angular/common';
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

  transactions: { month: Date; days: Day[] }[] = [];

  constructor(private transactionService: TransactionService) {
    this.transactionService.getTransactions().subscribe({
      next: (transactions) => {
        const grouped = transactions.days.reduce((acc, day) => {
          const date = new Date(day.id);
          const firstDayOfMonth = new Date(
            date.getFullYear(),
            date.getMonth(),
            1
          ).toLocaleString('default');

          acc[firstDayOfMonth] = acc[firstDayOfMonth] || [];
          acc[firstDayOfMonth].push(day);
          return acc;
        }, {} as groupedTransactions);

        this.transactions = Object.entries(grouped).map(([month, days]) => ({
          month: new Date(month),
          days,
        }));
      },
      error: (error) => {
        console.log('getTransactions error', error);
      },
    });
  }
}
