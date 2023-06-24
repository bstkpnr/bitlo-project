import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {
  transform(phoneValue: number | string): string {
    const stringPhone = phoneValue + '';
    return stringPhone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  }
}