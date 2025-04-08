import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dayMonthFormat',
  standalone: true,
})
export class DayMonthFormatPipe implements PipeTransform {
  transform(value: string): string {
    const date = new Date(value);

    const monthLong = date.toLocaleString('default', {
      month: 'short',
    });

    const dayDigit = date.toLocaleString('default', {
      day: '2-digit',
    });

    return `${dayDigit} ${monthLong}`;
  }
}
