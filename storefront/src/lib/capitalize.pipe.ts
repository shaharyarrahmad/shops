import { Pipe, PipeTransform } from '@angular/core';
/*
 * Transforms cents to Euro
 * Example:
 *   {{ 2000 | euro }}
 *   formats to: €20,00
*/
@Pipe({name: 'capitalize'})
export class CapitalizePipe implements PipeTransform {
  transform(value: string): string {
    if (!value || value.length === 0) {
      return value;
    }
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
