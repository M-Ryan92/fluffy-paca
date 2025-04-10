import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-transactions-month-container',
  imports: [],
  templateUrl: 'month-container.component.html',
  styleUrl: './month-container.component.scss',
})
export class MonthContainerComponent {
  @Input() month!: Date;

  public getShortMonth(): string {
    return new Date(this.month).toLocaleString('default', {
      month: 'short',
    });
  }
}
