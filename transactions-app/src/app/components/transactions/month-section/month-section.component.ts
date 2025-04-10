import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-transactions-month-section',
  imports: [],
  templateUrl: 'month-section.component.html',
  styleUrl: './month-section.component.scss',
})
export class MonthSectionComponent {
  @Input() month!: Date;

  public getShortMonth(): string {
    return new Date(this.month).toLocaleString('default', {
      month: 'short',
    });
  }
}
