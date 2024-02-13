import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  standalone: true,
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges {
  @Input() totalItems: number = 0;
  @Input() itemsPerPage: number = 10;
  @Input() currentPage: number = 1;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  totalPages: number = 0;
  pages: number[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.totalItems || changes.itemsPerPage) {
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }
  }

  onPrevious(): void {
    if (this.currentPage > 1) {
      this.pageChange.emit(--this.currentPage);
    }
  }

  onNext(): void {
    if (this.currentPage < this.totalPages) {
      this.pageChange.emit(++this.currentPage);
    }
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.pageChange.emit(this.currentPage);
  }
}
