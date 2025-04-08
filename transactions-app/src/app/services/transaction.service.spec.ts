import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TransactionService } from './transaction.service';
import { Transaction, TransactionData } from '../../shared/types';
import { CurrencyCode } from '../../shared/constants';

describe('TransactionService', () => {
  let service: TransactionService;
  let httpMock: HttpTestingController;

  const mockTransactionData: TransactionData = {
    days: [
      {
        id: '2024-03-15',
        transactions: [
          {
            id: 123,
            timestamp: '2024-03-15T10:30:00Z',
            amount: 100.5,
            currencyCode: CurrencyCode.EUR,
            description: 'Test transaction',
            otherParty: {
              name: 'Test Person',
              iban: 'NL91ABNA0417164300',
            },
          },
        ],
      },
    ],
  };

  const mockTransaction: Transaction =
    mockTransactionData.days[0].transactions[0];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TransactionService],
    });

    service = TestBed.inject(TransactionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify that no unmatched requests are outstanding
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getTransactions', () => {
    it('should retrieve all transactions', () => {
      service.getTransactions().subscribe((data) => {
        expect(data).toEqual(mockTransactionData);
      });

      const req = httpMock.expectOne('http://localhost:8080/api/transactions');
      expect(req.request.method).toBe('GET');
      req.flush(mockTransactionData);
    });

    it('should handle error when retrieving transactions fails', () => {
      service.getTransactions().subscribe({
        error: (error) => {
          expect(error.status).toBe(500);
        },
      });

      const req = httpMock.expectOne('http://localhost:8080/api/transactions');
      req.flush('Error fetching transactions', {
        status: 500,
        statusText: 'Internal Server Error',
      });
    });
  });

  describe('getTransactionByDayAndId', () => {
    it('should retrieve a specific transaction by day and id', () => {
      const day = '2024-03-15';
      const id = '123';

      service.getTransactionByDayAndId(day, id).subscribe((transaction) => {
        expect(transaction).toEqual(mockTransaction);
      });

      const req = httpMock.expectOne(
        `http://localhost:8080/api/transactions/${day}/${id}`
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockTransaction);
    });

    it('should handle error when retrieving specific transaction fails', () => {
      const day = '2024-03-15';
      const id = '999';

      service.getTransactionByDayAndId(day, id).subscribe({
        error: (error) => {
          expect(error.status).toBe(404);
        },
      });

      const req = httpMock.expectOne(
        `http://localhost:8080/api/transactions/${day}/${id}`
      );
      req.flush('Transaction not found', {
        status: 404,
        statusText: 'Not Found',
      });
    });
  });
});
