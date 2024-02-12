
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paginate',
  standalone: true
})
export class PaginatePipe implements PipeTransform {

  transform(value: any[], args: { itemsPerPage: number, currentPage: number }): any[] {
    if (!value || !args) {
      return value;
    }
    const startIndex = (args.currentPage - 1) * args.itemsPerPage;
    return value.slice(startIndex, startIndex + args.itemsPerPage);
  }
}
