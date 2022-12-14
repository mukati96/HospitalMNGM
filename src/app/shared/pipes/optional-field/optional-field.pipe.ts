import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'optionalField'
})
export class OptionalFieldPipe implements PipeTransform {

  transform(value: any, optionalText: string = 'N/A'): unknown {
    if(value) {
      return value;
    } else return optionalText;
  }

}
