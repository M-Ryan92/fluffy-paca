import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionRecordComponent } from './transaction-record.component';
import { Router } from '@angular/router';
import { LocalTransaction, ForeignTransaction } from '../../../../shared/types';
import { CurrencyCode } from '../../../../shared/constants';
import { By } from '@angular/platform-browser';
import { NgClass } from '@angular/common';
import { CurrencyPipe } from '@angular/common';

describe('TransactionRecordComponent', () => {
  let component: TransactionRecordComponent;
  let fixture: ComponentFixture<TransactionRecordComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockLocalTransaction: LocalTransaction = {
    id: 1,
    timestamp: '2023-01-01T10:00:00Z',
    amount: 100,
    currencyCode: CurrencyCode.EUR,
    description: 'Test transaction',
    otherParty: {
      name: 'Test Person',
      iban: 'NL91ABNA0417164300',
    },
  };

  const mockForeignTransaction: ForeignTransaction = {
    id: 2,
    timestamp: '2023-01-01T11:00:00Z',
    amount: 200,
    currencyCode: CurrencyCode.USD,
    currencyRate: 0.85,
    description: 'Foreign transaction',
    otherParty: {
      name: 'Test Company',
      iban: 'NL91ABNA0417164301',
    },
  };

  const mockTransactionWithoutOtherParty: LocalTransaction = {
    id: 3,
    timestamp: '2023-01-01T12:00:00Z',
    amount: 300,
    currencyCode: CurrencyCode.EUR,
    description: 'ATM transaction',
  };

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [TransactionRecordComponent, NgClass],
      providers: [{ provide: Router, useValue: routerSpy }, CurrencyPipe],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionRecordComponent);
    component = fixture.componentInstance;
    component.transaction = mockLocalTransaction;
    component.day = '2023-01-01';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the other party name when available', () => {
    expect(component.otherPartyName()).toBe('Test Person');
  });

  it('should display "ATM" when other party is not available', () => {
    fixture = TestBed.createComponent(TransactionRecordComponent);
    component = fixture.componentInstance;
    component.transaction = mockTransactionWithoutOtherParty;
    fixture.detectChanges();
    expect(component.otherPartyName()).toBe('ATM');
  });

  it('should format local currency amount correctly', () => {
    expect(typeof component.amount()).toBe('string');
  });

  it('should convert foreign currency amount to EUR', () => {
    component.transaction = mockForeignTransaction;
    fixture.detectChanges();

    expect(typeof component.amount()).toBe('string');
    const amountValue = component.amount();
    expect(amountValue).toContain('100.00');
  });

  it('should navigate to transaction details when clicked', () => {
    component.onTransactionClick();
    expect(routerSpy.navigate).toHaveBeenCalledWith([
      'transaction-details',
      '2023-01-01',
      1,
    ]);
  });

  it('should apply first and last classes correctly', () => {
    component.isFirst = true;
    component.isLast = false;
    fixture.detectChanges();

    const transactionElement = fixture.debugElement.query(
      By.css('.transaction-row')
    );
    expect(transactionElement.classes['first']).toBeTruthy();
    expect(transactionElement.classes['last']).toBeFalsy();

    component.isFirst = false;
    component.isLast = true;
    fixture.detectChanges();

    expect(transactionElement.classes['first']).toBeFalsy();
    expect(transactionElement.classes['last']).toBeTruthy();
  });

  it('should apply positive class when amount is positive', () => {
    component.transaction = {
      ...mockLocalTransaction,
      amount: 100.5,
    };
    fixture.detectChanges();

    const amountElement =
      fixture.nativeElement.querySelector('.transaction-icon');
    expect(amountElement.classList.contains('positive')).toBeTrue();
  });

  it('should not apply positive class when amount is negative', () => {
    component.transaction = {
      ...mockLocalTransaction,
      amount: -100.5,
    };
    fixture.detectChanges();

    const amountElement =
      fixture.nativeElement.querySelector('.transaction-icon');
    expect(amountElement.classList.contains('positive')).toBeFalse();
  });
});
