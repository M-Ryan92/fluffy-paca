import { Component, Input } from '@angular/core';
import { TransactionRecordComponent } from '../transaction-record/transaction-record.component';
import { DayMonthFormatPipe } from './pipe/day-month-format.pipe';
import { Transaction } from '../../../../shared/types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transactions-day-container',
  imports: [TransactionRecordComponent, DayMonthFormatPipe, CommonModule],
  template: `
    <div class="day-container">
      <span class="rounded-day-icon">{{ dayId | dayMonthFormat }}</span>
      <div class="transactions-container">
        <app-transaction-record
          *ngFor="let transaction of transactions; let i = index"
          [transaction]="transaction"
          [day]="dayId"
          [isFirst]="i === 0"
          [isLast]="i === transactions.length - 1"
        />
      </div>
    </div>
  `,
  styleUrl: './day-container.component.scss',
})
export class DayContainerComponent {
  @Input() dayId!: string;
  @Input() transactions!: Transaction[];
}
