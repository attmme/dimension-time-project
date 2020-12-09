import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipePassword'
})
export class PipePassword implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
