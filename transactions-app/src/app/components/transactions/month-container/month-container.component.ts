import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-transactions-month-container',
  imports: [],
  template: `
    <div class="month-header">
      <span class="rounded-month-icon">{{ month }}</span>
    </div>
    <div class="month-transactions">
      <ng-content></ng-content>
    </div>
  `,
  styleUrl: './month-container.component.scss',
})
export class MonthContainerComponent {
  @Input() month!: string;
}
