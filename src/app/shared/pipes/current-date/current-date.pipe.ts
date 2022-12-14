import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'currentdate',
})
export class CurrentDatePipe implements PipeTransform {
  //   currentStringDate!: string;
  constructor() {}
  transform(date: any) {
    if (date) {
      return moment(date).format('DD/MM/YYYY');
    }

    return '';
  }
}
