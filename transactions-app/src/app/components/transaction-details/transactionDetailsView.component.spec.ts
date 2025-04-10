import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionDetailsViewComponent } from './transactionDetailsView.component';
import { ActivatedRoute } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { of, throwError } from 'rxjs';
import { LocalTransaction, ForeignTransaction } from '../../../shared/types';
import { CurrencyCode } from '../../../shared/constants';
import { CardComponent } from './card/card.component';
import { CurrencyPipe, DatePipe } from '@angular/common';

describe('TransactionDetailsViewComponent', () => {
  let component: TransactionDetailsViewComponent;
  let fixture: ComponentFixture<TransactionDetailsViewComponent>;
  let transactionService: jasmine.SpyObj<TransactionService>;
  let activatedRoute: Partial<ActivatedRoute>;

  const mockLocalTransaction: Required<LocalTransaction> = {
    id: 1,
    description: 'Test Transaction',
    amount: 100,
    timestamp: '2024-03-20T10:00:00',
    currencyCode: CurrencyCode.EUR,
    otherParty: {
      name: 'Test Person',
      iban: 'NL91ABNA0417164300',
    },
  };

  const mockForeignTransaction: Required<ForeignTransaction> = {
    id: 2,
    description: 'Foreign Transaction',
    amount: 150,
    timestamp: '2024-03-20T11:00:00',
    currencyCode: CurrencyCode.USD,
    currencyRate: 1.1,
    otherParty: {
      name: 'Foreign Person',
      iban: 'US91ABNA0417164300',
    },
  };

  beforeEach(async () => {
    const transactionServiceSpy = jasmine.createSpyObj('TransactionService', [
      'getTransactionByDayAndId',
    ]);

    activatedRoute = {
      params: of({ day: '2024-03-20', id: '1' }),
    };

    await TestBed.configureTestingModule({
      imports: [
        TransactionDetailsViewComponent,
        CardComponent,
        CurrencyPipe,
        DatePipe,
      ],
      providers: [
        { provide: TransactionService, useValue: transactionServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRoute },
      ],
    }).compileComponents();

    transactionService = TestBed.inject(
      TransactionService
    ) as jasmine.SpyObj<TransactionService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionDetailsViewComponent);
    component = fixture.componentInstance;
  });

  it('should load and display local transaction details', () => {
    transactionService.getTransactionByDayAndId.and.returnValue(
      of(mockLocalTransaction)
    );

    fixture.detectChanges();

    expect(component.transaction).toEqual(mockLocalTransaction);
    expect(component.description).toBe(mockLocalTransaction.description);
    expect(component.amount).toBe(mockLocalTransaction.amount);
    expect(component.isForeignCurrency).toBeFalse();
    expect(component.otherPartyName).toBe(mockLocalTransaction.otherParty.name);
    expect(component.otherPartyIban).toBe(mockLocalTransaction.otherParty.iban);
  });

  it('should load and display foreign transaction details with currency conversion', () => {
    transactionService.getTransactionByDayAndId.and.returnValue(
      of(mockForeignTransaction)
    );

    fixture.detectChanges();

    expect(component.transaction).toEqual(mockForeignTransaction);
    expect(component.description).toBe(mockForeignTransaction.description);
    expect(component.amount).toBe(
      mockForeignTransaction.amount / mockForeignTransaction.currencyRate
    );
    expect(component.originalAmount).toBe(mockForeignTransaction.amount);
    expect(component.isForeignCurrency).toBeTrue();
    expect(component.currencyRate).toBe(mockForeignTransaction.currencyRate);
    expect(component.currencyCode).toBe(mockForeignTransaction.currencyCode);
  });

  it('should handle transaction with no other party', () => {
    const transactionWithoutOtherParty: LocalTransaction = {
      ...mockLocalTransaction,
      otherParty: undefined,
    };

    transactionService.getTransactionByDayAndId.and.returnValue(
      of(transactionWithoutOtherParty)
    );

    fixture.detectChanges();

    expect(component.otherPartyName).toBe('ATM');
    expect(component.otherPartyIban).toBeUndefined();
  });

  it('should handle error when loading transaction', () => {
    const consoleSpy = spyOn(console, 'log');
    transactionService.getTransactionByDayAndId.and.returnValue(
      throwError(() => new Error('Test error'))
    );

    fixture.detectChanges();

    expect(consoleSpy).toHaveBeenCalledWith(
      'getTransactionByDayAndId error',
      jasmine.any(Error)
    );
  });

  it('should display not found template when transaction is null', () => {
    transactionService.getTransactionByDayAndId.and.returnValue(
      throwError(() => new Error('Not found'))
    );

    fixture.detectChanges();

    const notFoundElement = fixture.nativeElement.querySelector(
      '.content-header-title'
    );
    expect(notFoundElement.textContent).toContain('Transaction not found');
  });
});
