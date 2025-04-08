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
  selector: 'transaction-details-view',
  imports: [NgIf, CardComponent, CurrencyPipe, DatePipe],
  templateUrl: './transactionDetailsView.component.html',
  styleUrls: ['./transactionDetailsView.component.scss'],
})
export class TransactionDetailsViewComponent implements OnInit {
  day!: string;
  id!: string;

  description!: string;
  amount!: number;
  originalAmount!: number;
  date!: string;
  currencyRate!: number;
  currencyCode!: string;
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
      .subscribe((transaction) => {
        this.transaction = transaction;
        this.description = transaction.description;
        this.amount = transaction.amount;
        this.date = transaction.timestamp;
        this.currencyCode = transaction.currencyCode;

        if (!isLocalTransaction(transaction)) {
          this.currencyRate = transaction.currencyRate;
          this.amount = transaction.amount / this.currencyRate;
          this.originalAmount = transaction.amount;
          this.isForeignCurrency = true;
        }
      });
  }
}
