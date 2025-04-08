import { Component, computed, Input } from '@angular/core';
import { Transaction } from '../../../../shared/types';
import { CurrencyPipe, NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { CurrencyCode } from '../../../../shared/constants';
@Component({
  selector: 'transaction-record',
  templateUrl: './transaction-record.component.html',
  styleUrls: ['./transaction-record.component.scss'],
  standalone: true,
  imports: [NgClass],
})
export class TransactionRecordComponent {
  @Input() transaction!: Transaction;
  @Input() day!: string;

  public otherPartyName = computed(() => {
    const otherParty = this.transaction.otherParty;
    return otherParty ? otherParty.name : 'My Account';
  });

  public amount = computed(() => {
    let value = this.transaction.amount;
    if (this.transaction.currencyCode !== CurrencyCode.EUR) {
      value = this.transaction.amount / this.transaction.currencyRate;
    }

    return new CurrencyPipe(navigator.language).transform(
      value,
      CurrencyCode.EUR
    );
  });

  @Input() isFirst = false;
  @Input() isLast = false;

  constructor(private router: Router) {}

  onTransactionClick() {
    this.router.navigate([
      'transaction-details',
      this.day,
      this.transaction.id,
    ]);
  }
}
