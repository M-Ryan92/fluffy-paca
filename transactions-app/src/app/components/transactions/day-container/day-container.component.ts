import { Component, Input } from '@angular/core';
import { TransactionRecordComponent } from '../transaction-record/transaction-record.component';
import { DayMonthFormatPipe } from './pipe/day-month-format.pipe';
import { Transaction } from '../../../../shared/types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transactions-day-container',
  imports: [TransactionRecordComponent, DayMonthFormatPipe, CommonModule],
  templateUrl: './day-container.component.html',
  styleUrl: './day-container.component.scss',
})
export class DayContainerComponent {
  @Input() dayId!: string;
  @Input() transactions!: Transaction[];
}
