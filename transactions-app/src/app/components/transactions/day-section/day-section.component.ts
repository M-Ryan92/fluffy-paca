import { Component, Input } from '@angular/core';
import { TransactionRecordComponent } from '../transaction-record/transaction-record.component';
import { DayMonthFormatPipe } from './pipe/day-month-format.pipe';
import { Transaction } from '../../../../shared/types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transactions-day-section',
  imports: [TransactionRecordComponent, DayMonthFormatPipe, CommonModule],
  templateUrl: './day-section.component.html',
  styleUrl: './day-section.component.scss',
})
export class DaySectionComponent {
  @Input() dayId!: string;
  @Input() transactions!: Transaction[];
}
