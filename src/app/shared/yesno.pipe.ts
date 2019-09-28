import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'yesno' })

export class YesNoPipe implements PipeTransform {
  transform(extras: boolean): string {
    if(extras) {
      return 'Yes';
    } else {
      return 'No';
    }
  }

}
