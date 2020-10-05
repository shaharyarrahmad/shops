import { Pipe, PipeTransform } from '@angular/core';
/*
 * Transforms cents to Euro
 * Example:
 *   {{ 2000 | euro }}
 *   formats to: €20,00
*/
@Pipe({name: 'euro'})
export class EuroPipe implements PipeTransform {
  transform(value: number): string {
    if (!value) {
      value = 0;
    }
    (value / 100).toFixed(2);
    const currencyString = `€${(value / 100).toFixed(2).replace('.', ',')}`;
    if (currencyString.endsWith('00')) {
      return currencyString.replace(new RegExp( '00$'), '-');
    }
    return currencyString;
  }
}
