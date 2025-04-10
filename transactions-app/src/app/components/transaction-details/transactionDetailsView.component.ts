import { Component, OnInit } from '@angular/core';
import { CurrencyPipe, DatePipe, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CardComponent } from './card/card.component';
import { TransactionService } from '../../services/transaction.service';
import { LocalTransaction, Transaction } from '../../../shared/types';
import { CurrencyCode } from '../../../shared/constants';

function isLocalTransaction(
  transaction: Transaction
): transaction is LocalTransaction {
  return transaction.currencyCode === 'EUR';
}

@Component({
  selector: 'app-transaction-details-view',
  imports: [NgIf, CardComponent, CurrencyPipe, DatePipe],
  templateUrl: './transactionDetailsView.component.html',
  styleUrls: ['./transactionDetailsView.component.scss'],
})
export class TransactionDetailsViewComponent implements OnInit {
  day!: string;
  id!: string;

  otherParty: {
    name: string;
    iban?: string;
  } | null = null;

  amount!: number;
  originalAmount!: number;
  currencyRate!: number;
  localCurrencyCode: string = CurrencyCode.EUR;
  isForeignCurrency = false;
  transaction: Transaction | null = null;
  constructor(
    private route: ActivatedRoute,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    // Get route parameters
    this.route.params.subscribe((params) => {
      this.day = params['day'];
      this.id = params['id'];
    });

    this.transactionService
      .getTransactionByDayAndId(this.day, this.id)
      .subscribe({
        next: (transaction) => {
          this.transaction = transaction;
          this.otherParty = transaction.otherParty ?? null;
          this.amount = transaction.amount;

          if (!isLocalTransaction(transaction)) {
            this.currencyRate = transaction.currencyRate;
            this.amount = transaction.amount / this.currencyRate;
            this.originalAmount = transaction.amount;
            this.isForeignCurrency = true;
          }
        },
        error: (error) => {
          console.log('getTransactionByDayAndId error', error);
        },
      });
  }
}
