import { DayMonthFormatPipe } from './day-month-format.pipe';

describe('DayMonthFormatPipe', () => {
  let pipe: DayMonthFormatPipe;

  beforeEach(() => {
    pipe = new DayMonthFormatPipe();
  });

  it('should create', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform date string to day and short month format', () => {
    expect(pipe.transform('2023-01-01')).toBe('01 Jan');
    expect(pipe.transform('2023-12-31')).toBe('31 Dec');
    expect(pipe.transform('2023-06-15')).toBe('15 Jun');
    expect(pipe.transform('2023-02-28')).toBe('28 Feb');
  });

  it('should handle different date formats', () => {
    expect(pipe.transform('2023-01-01T12:00:00Z')).toBe('01 Jan');
    expect(pipe.transform('2023-01-01 12:00:00')).toBe('01 Jan');
  });
});
