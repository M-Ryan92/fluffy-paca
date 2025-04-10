import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DayContainerComponent } from './day-container.component';
import { TransactionRecordComponent } from '../transaction-record/transaction-record.component';
import { DayMonthFormatPipe } from './pipe/day-month-format.pipe';
import { Transaction } from '../../../../shared/types';
import { CurrencyCode } from '../../../../shared/constants';
import { By } from '@angular/platform-browser';

describe('DayContainerComponent', () => {
  let component: DayContainerComponent;
  let fixture: ComponentFixture<DayContainerComponent>;

  const mockTransactions: Transaction[] = [
    {
      id: 1,
      timestamp: '2023-01-01T10:00:00Z',
      amount: 100,
      currencyCode: CurrencyCode.EUR,
      description: 'Test transaction 1',
      otherParty: {
        name: 'Test Person',
        iban: 'NL91ABNA0417164300',
      },
    },
    {
      id: 2,
      timestamp: '2023-01-01T11:00:00Z',
      amount: 200,
      currencyCode: CurrencyCode.EUR,
      description: 'Test transaction 2',
      otherParty: {
        name: 'Test Company',
        iban: 'NL91ABNA0417164301',
      },
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DayContainerComponent,
        TransactionRecordComponent,
        DayMonthFormatPipe,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DayContainerComponent);
    component = fixture.componentInstance;
    component.dayId = '2023-01-01';
    component.transactions = mockTransactions;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the day and month in the correct format', () => {
    const dayIcon = fixture.debugElement.query(By.css('.rounded-day-icon'));
    expect(dayIcon.nativeElement.textContent.trim()).toBe('01 Jan');
  });

  it('should render transaction records for each transaction', () => {
    const transactionElements = fixture.debugElement.queryAll(
      By.css('app-transaction-record')
    );
    expect(transactionElements.length).toBe(2);
  });

  it('should pass correct inputs to transaction records', () => {
    const transactionElements = fixture.debugElement.queryAll(
      By.css('app-transaction-record')
    );

    expect(transactionElements[0].componentInstance.transaction).toBe(
      mockTransactions[0]
    );
    expect(transactionElements[0].componentInstance.day).toBe('2023-01-01');
    expect(transactionElements[0].componentInstance.isFirst).toBe(true);
    expect(transactionElements[0].componentInstance.isLast).toBe(false);

    expect(transactionElements[1].componentInstance.transaction).toBe(
      mockTransactions[1]
    );
    expect(transactionElements[1].componentInstance.day).toBe('2023-01-01');
    expect(transactionElements[1].componentInstance.isFirst).toBe(false);
    expect(transactionElements[1].componentInstance.isLast).toBe(true);
  });
});
