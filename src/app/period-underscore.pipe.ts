import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'periodUnderscore'
})
export class PeriodUnderscorePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) { return value; }
    const newVal = value.replace(/\./g, '_');
    return newVal;
  }
}
