import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'spaceUnderscore'
})
export class SpaceUnderscorePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) { return value; }
    let newVal = value.replace(/ /g, '_');
    newVal = newVal.replace(/\(/g, '_').replace(/\)/g, '_');
    newVal = newVal.replace(/\//g, '_');
    newVal = newVal.replace(/,/g, '_');
    return newVal;
  }
}
