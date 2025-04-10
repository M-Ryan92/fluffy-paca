import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MonthContainerComponent } from './month-container.component';
import { By } from '@angular/platform-browser';

describe('MonthContainerComponent', () => {
  let component: MonthContainerComponent;
  let fixture: ComponentFixture<MonthContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MonthContainerComponent);
    component = fixture.componentInstance;
    component.month = new Date('2023-01-15');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the short month name', () => {
    const monthHeader = fixture.debugElement.query(By.css('.month-header'));
    expect(monthHeader.nativeElement.textContent.trim()).toBe('Jan');
  });

  it('should return the correct short month name', () => {
    component.month = new Date('2023-01-15');
    expect(component.getShortMonth()).toBe('Jan');

    component.month = new Date('2023-12-15');
    expect(component.getShortMonth()).toBe('Dec');

    component.month = new Date('2023-06-15');
    expect(component.getShortMonth()).toBe('Jun');
  });

  it('should display the month in the header', () => {
    component.month = new Date('01-01-2001');
    fixture.detectChanges();

    const monthElement = fixture.nativeElement.querySelector(
      '.rounded-month-icon'
    );
    expect(monthElement.textContent).toContain('Jan');
  });

  it('should render content passed via ng-content', () => {
    const testContent = document.createElement('div');
    testContent.textContent = 'Test Transaction';
    testContent.className = 'test-transaction';

    const contentContainer = fixture.nativeElement.querySelector(
      '.month-transactions'
    );

    contentContainer.appendChild(testContent);

    fixture.detectChanges();

    const renderedContent =
      fixture.nativeElement.querySelector('.test-transaction');
    expect(renderedContent).toBeTruthy();
    expect(renderedContent.textContent).toContain('Test Transaction');
  });
});
