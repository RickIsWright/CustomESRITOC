import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'underscoreToSpace'
})
export class UnderscoreToSpacePipe implements PipeTransform {

  transform(value: string): string {
    const newVal = value.replace(/_/g, ' ');
    return newVal;
}

}
