import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionRecordComponent } from './transaction-record.component';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { NgClass } from '@angular/common';
import { ForeignTransaction } from '../../../../shared/types';
import { CurrencyCode } from '../../../../shared/constants';

describe('TransactionRecordComponent', () => {
  let component: TransactionRecordComponent;
  let fixture: ComponentFixture<TransactionRecordComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockTransaction: ForeignTransaction = {
    id: 123,
    timestamp: '2023-01-01T12:00:00Z',
    amount: 100.5,
    currencyCode: CurrencyCode.USD,
    currencyRate: 1,
    description: 'Test transaction',
    otherParty: {
      name: 'Test Person',
      iban: 'NL91ABNA0417164300',
    },
  };

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [TransactionRecordComponent, NgClass],
      providers: [{ provide: Router, useValue: routerSpy }, CurrencyPipe],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionRecordComponent);
    component = fixture.componentInstance;
    component.transaction = mockTransaction;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the other party name when available', () => {
    const partyElement =
      fixture.nativeElement.querySelector('.transaction-party');
    expect(partyElement.textContent.trim()).toBe('Test Person');
  });

  it('should display "My Account" when other party is not available', () => {
    fixture = TestBed.createComponent(TransactionRecordComponent);
    component = fixture.componentInstance;
    component.transaction = { ...mockTransaction, otherParty: undefined };
    fixture.detectChanges();

    const expectedName = component.otherPartyName();
    console.log({ expectedName });
    expect(expectedName).toBe('My Account');

    const partyElement =
      fixture.nativeElement.querySelector('.transaction-party');
    expect(partyElement.textContent.trim()).toBe('My Account');
  });

  it('should apply positive class when amount is positive', () => {
    component.transaction = {
      ...mockTransaction,
      amount: 100.5,
    };
    fixture.detectChanges();

    const amountElement =
      fixture.nativeElement.querySelector('.transaction-icon');
    expect(amountElement.classList.contains('positive')).toBeTrue();
  });

  it('should not apply positive class when amount is negative', () => {
    component.transaction = {
      ...mockTransaction,
      amount: -100.5,
    };
    fixture.detectChanges();

    const amountElement =
      fixture.nativeElement.querySelector('.transaction-icon');
    expect(amountElement.classList.contains('positive')).toBeFalse();
  });

  it('should navigate to transaction details when clicked', () => {
    component.day = '2023-01-01';
    component.onTransactionClick();

    expect(routerSpy.navigate).toHaveBeenCalledWith([
      'transaction-details',
      '2023-01-01',
      123,
    ]);
  });

  it('should apply first class when isFirst is true', () => {
    component.isFirst = true;
    fixture.detectChanges();

    const rowElement = fixture.nativeElement.querySelector('.transaction-row');
    expect(rowElement.classList.contains('first')).toBeTrue();
  });

  it('should apply last class when isLast is true', () => {
    component.isLast = true;
    fixture.detectChanges();

    const rowElement = fixture.nativeElement.querySelector('.transaction-row');
    expect(rowElement.classList.contains('last')).toBeTrue();
  });
});
